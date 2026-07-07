const { db } = require("../utils/db");

/**
 * Store Refresh Token
 */
async function createRefreshToken(userId, tokenHash, expiresAt) {
    const { rows } = await db.query(
        `
        INSERT INTO refresh_tokens (
            user_id,
            token_hash,
            expires_at
        )
        VALUES ($1,$2,$3)
        RETURNING id
        `,
        [userId, tokenHash, expiresAt]
    );

    return rows[0];
}

/**
 * Find Refresh Token
 */
async function findRefreshToken(tokenHash) {
    const { rows } = await db.query(
        `
        SELECT *
        FROM refresh_tokens
        WHERE token_hash = $1
        LIMIT 1
        `,
        [tokenHash]
    );

    return rows[0];
}

/**
 * Delete Current Device Refresh Token
 */
async function deleteRefreshToken(tokenHash) {
    await db.query(
        `
        DELETE
        FROM refresh_tokens
        WHERE token_hash = $1
        `,
        [tokenHash]
    );
}

/**
 * Logout From All Devices
 */
async function deleteAllRefreshTokensByUser(userId) {
    await db.query(
        `
        DELETE
        FROM refresh_tokens
        WHERE user_id = $1
        `,
        [userId]
    );
}
/**
 * Delete all expired refresh tokens
 */
async function deleteExpiredRefreshTokens() {
    await db.query(
        `
        DELETE
        FROM refresh_tokens
        WHERE expires_at < NOW()
        `
    );
}

module.exports = {
    createRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteAllRefreshTokensByUser,
    deleteExpiredRefreshTokens
};