const urlModel = require("../models/url.model");

const { encodeBase62 } = require("../utils/base62");
const {
    cacheUrl,
    getCachedUrl,
    deleteCachedUrl
} = require("../utils/redis");

/**
 * Create Short URL
 */
async function createShortUrl(userId, longUrl) {

    // Remove leading/trailing spaces
    longUrl = longUrl.trim();

    // Add protocol if missing
    if (
        !longUrl.startsWith("http://") &&
        !longUrl.startsWith("https://")
    ) {
        longUrl = "https://" + longUrl;
    }

    // Validate URL
    try {
        new URL(longUrl);
    } catch (err) {
        throw new Error("Invalid URL.");
    }

    // Check if user has already shortened this URL
    const existingUrl = await urlModel.findByLongUrl(
        userId,
        longUrl
    );

    // Return existing URL
    if (existingUrl) {
        return {
            ...existingUrl,
            short_url: `${process.env.BASE_URL}/${existingUrl.short_code}`,
        };
    }

    // Get next PostgreSQL ID
    const id = await urlModel.getNextUrlId();

    // Generate Base62 Short Code
    const shortCode = encodeBase62(id);

    // Store URL
    const url = await urlModel.createUrl(
        id,
        userId,
        longUrl,
        shortCode
    );

    // Return response
    return {
        ...url,
        short_url: `${process.env.BASE_URL}/${url.short_code}`,
    };
}
/**
 * Redirect URL
 */
async function redirectUrl(shortCode) {

    // Check Redis Cache
    const cachedUrl = await getCachedUrl(shortCode);

    if (cachedUrl) {

        // Fire and Forget
        urlModel
            .incrementClickCount(cachedUrl.id)
            .catch((err) => {
                console.error(
                    "Increment Click Count Error:",
                    err.message
                );
            });

        return cachedUrl.longUrl;
    }

    // Cache Miss
    const url = await urlModel.findByShortCode(shortCode);

    if (!url) {
        throw new Error("Short URL not found.");
    }

    // Cache URL
    await cacheUrl(
        shortCode,
        {
            id: url.id,
            longUrl: url.long_url,
        }
    );

    // Fire and Forget
    urlModel
        .incrementClickCount(url.id)
        .catch((err) => {
            console.error(
                "Increment Click Count Error:",
                err.message
            );
        });

    return url.long_url;
}
/**
 * Get All URLs of Current User
 */
async function getUserUrls(userId) {

    const urls = await urlModel.getUserUrls(userId);

    return urls.map((url) => ({
        id: url.id,
        longUrl: url.long_url,
        shortCode: url.short_code,
        shortUrl: `${process.env.BASE_URL}/${url.short_code}`,
        clickCount: url.click_count,
        createdAt: url.created_at,
    }));
}
/**
 * Get Dashboard Statistics
 */
async function getDashboardStats(userId) {

    const stats = await urlModel.getDashboardStats(userId);

    return {
        totalLinks: stats.totalLinks,
        totalClicks: stats.totalClicks,
        activeLinks: stats.totalLinks,
        linksCreatedToday: stats.linksCreatedToday,
    };
}
/**
 * Delete URL
 */
async function deleteUrl(id, userId) {

    const url = await urlModel.deleteUrl(
        id,
        userId
    );

    if (!url) {
        throw new Error(
            "URL not found."
        );
    }

    // Remove Redis Cache
    await deleteCachedUrl(
        url.short_code
    );

    return;
}
/**
 * Get URL Analytics
 */
async function getUrlAnalytics(id, userId) {

    const url = await urlModel.getUrlAnalytics(
        id,
        userId
    );

    if (!url) {
        throw new Error("URL not found.");
    }

    return {
        id: url.id,
        longUrl: url.long_url,
        shortCode: url.short_code,
        shortUrl: `${process.env.BASE_URL}/${url.short_code}`,
        clickCount: url.click_count,
        createdAt: url.created_at,
    };
}

module.exports = {
    createShortUrl,
    redirectUrl,
    getUserUrls,
    deleteUrl,
    getUrlAnalytics,
    getDashboardStats
};