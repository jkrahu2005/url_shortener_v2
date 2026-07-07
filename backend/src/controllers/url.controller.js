const urlService = require("../services/url.service");

/**
 * Create Short URL
 */
async function createShortUrl(req, res) {
    try {

        const { longUrl } = req.body;

        if (!longUrl) {
            return res.status(400).json({
                success: false,
                message: "Long URL is required.",
            });
        }

        const url = await urlService.createShortUrl(
            req.user.id,
            longUrl
        );

        return res.status(201).json({
            success: true,
            message: "Short URL created successfully.",
            data: {
                id: url.id,
                longUrl: url.long_url,
                shortCode: url.short_code,
                shortUrl: url.short_url,
                clickCount: url.click_count,
                createdAt: url.created_at,
            },
        });

    } catch (err) {

        console.error(
            "Create Short URL Controller Error:",
            err.message
        );

        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}
/**
 * Redirect URL
 */
async function redirectUrl(req, res) {

    try {

        const { shortCode } = req.params;

        const longUrl =
            await urlService.redirectUrl(
                shortCode
            );

        return res.redirect(longUrl);

    } catch (err) {

        console.error(
            "Redirect Controller Error:",
            err.message
        );

        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
}
/**
 * Get Current User URLs
 */
async function getUserUrls(req, res) {

    try {
         console.log('1');
        const urls = await urlService.getUserUrls(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: urls,
        });

    } catch (err) {

        console.error(
            "Get User URLs Controller Error:",
            err.message
        );

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
/**
 * Get Dashboard Statistics
 */
async function getDashboardStats(req, res) {
    try {

        const stats = await urlService.getDashboardStats(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: stats,
        });

    } catch (err) {

        console.error(
            "Dashboard Stats Controller Error:",
            err.message
        );

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
/**
 * Delete URL
 */
async function deleteUrl(req, res) {

    try {

        await urlService.deleteUrl(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message:
                "URL deleted successfully.",
        });

    } catch (err) {

        console.error(
            "Delete URL Controller Error:",
            err.message
        );

        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
}
/**
 * Get URL Analytics
 */
async function getUrlAnalytics(req, res) {

    try {

        const analytics = await urlService.getUrlAnalytics(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: analytics,
        });

    } catch (err) {

        console.error(
            "Get URL Analytics Controller Error:",
            err.message
        );

        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
}
module.exports = {
    createShortUrl,
    redirectUrl,
    getUserUrls,
    deleteUrl,
    getUrlAnalytics,
    getDashboardStats
};