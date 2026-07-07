const { db } = require("../utils/db");


/**
 * Get Next URL ID from PostgreSQL Sequence
 */
async function getNextUrlId() {
    const result = await db.query(`
        SELECT nextval('urls_id_seq') AS id;
    `);

    return result.rows[0].id;
}

/**
 * Create URL
 */
async function createUrl(id, userId, longUrl, shortCode) {
    const result = await db.query(
        `
        INSERT INTO urls
        (
            id,
            user_id,
            long_url,
            short_code
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING *;
        `,
        [id, userId, longUrl, shortCode]
    );

    return result.rows[0];
}

/**
 * Find URL by Long URL
 */
async function findByLongUrl(userId, longUrl) {
    const result = await db.query(
        `
        SELECT *
        FROM urls
        WHERE user_id = $1
        AND long_url = $2;
        `,
        [userId, longUrl]
    );

    return result.rows[0];
}

/**
 * Find URL by Short Code
 */
async function findByShortCode(shortCode) {
    const result = await db.query(
        `
        SELECT *
        FROM urls
        WHERE short_code = $1;
        `,
        [shortCode]
    );

    return result.rows[0];
}

/**
 * Increment Click Count
 */
async function incrementClickCount(id) {
    await db.query(
        `
        UPDATE urls
        SET
            click_count = click_count + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1;
        `,
        [id]
    );
}

/**
 * Get All URLs of a User
 */
async function getUserUrls(userId) {
    const result = await db.query(
        `
        SELECT *
        FROM urls
        WHERE user_id = $1
        ORDER BY created_at DESC;
        `,
        [userId]
    );

    return result.rows;
}
/**
 * Dashboard Statistics
 */
async function getDashboardStats(userId) {
    const result = await db.query(
        `
        SELECT
            COUNT(*)::INT AS "totalLinks",
            COALESCE(SUM(click_count), 0)::INT AS "totalClicks",
            COUNT(*) FILTER (
                WHERE DATE(created_at) = CURRENT_DATE
            )::INT AS "linksCreatedToday"
        FROM urls
        WHERE user_id = $1;
        `,
        [userId]
    );

    return result.rows[0];
}

/**
 * Delete URL
 */
async function deleteUrl(id, userId) {
    const result = await db.query(
        `
        DELETE
        FROM urls
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
        `,
        [id, userId]
    );

    return result.rows[0];
}

/**
 * Find URL by ID
 */
async function findUrlById(id) {
    const result = await db.query(
        `
        SELECT *
        FROM urls
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];
}
async function getUrlAnalytics(id, userId) {
    const result = await db.query(
        `
        SELECT *
        FROM urls
        WHERE id = $1
        AND user_id = $2;
        `,
        [id, userId]
    );

    return result.rows[0];
}

module.exports = {
    getNextUrlId,
    createUrl,
    findByLongUrl,
    findByShortCode,
    incrementClickCount,
    getUserUrls,
    deleteUrl,
    findUrlById,
    getUrlAnalytics,
    getDashboardStats
};