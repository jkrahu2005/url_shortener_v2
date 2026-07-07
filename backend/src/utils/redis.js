const redisClient = require("./redisClient");

/**
 * Blacklist Access Token
 */
async function blacklistToken(jti, ttl) {
    await redisClient.set(
        `blacklist:${jti}`,
        "true",
        {
            EX: ttl,
        }
    );
}

/**
 * Check whether Access Token is blacklisted
 */
async function isTokenBlacklisted(jti) {
    const value = await redisClient.get(
        `blacklist:${jti}`
    );

    return value !== null;
}

/**
 * Cache Short URL
 */
/**
 * Cache Short URL
 */
async function cacheUrl(shortCode, url) {
    await redisClient.set(
        `url:${shortCode}`,
        JSON.stringify(url),
        {
            EX: 60 * 60 * 24,
        }
    );
}

/**
 * Get Cached URL
 */
/**
 * Get Cached URL
 */
async function getCachedUrl(shortCode) {

    const key = `url:${shortCode}`;

    const data = await redisClient.get(key);

    if (!data) {
        return null;
    }

    // Sliding Expiration
    await redisClient.expire(
        key,
        60 * 60 * 24
    );

    return JSON.parse(data);
}
/**
 * Delete Cached URL
 */
async function deleteCachedUrl(shortCode) {

    await redisClient.del(
        `url:${shortCode}`
    );
}
module.exports = {
    blacklistToken,
    isTokenBlacklisted,
    cacheUrl,
    getCachedUrl,
    deleteCachedUrl
};