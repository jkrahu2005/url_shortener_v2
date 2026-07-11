const { db } = require("../utils/db");

/**
 * Find User By Email
 */
async function findUserByEmail(email) {
    const { rows } = await db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        LIMIT 1
        `,
        [email]
    );

    return rows[0];
}

/**
 * Find User By ID
 */
async function findUserById(id) {
    const { rows } = await db.query(
        `
        SELECT id, full_name, email, created_at
        FROM users
        WHERE id = $1
        LIMIT 1
        `,
        [id]
    );

    return rows[0];
}

/**
 * Create User
 */
async function createUser(fullName, email, passwordHash) {
    const { rows } = await db.query(
        `
        INSERT INTO users (
            full_name,
            email,
            password_hash
        )
        VALUES ($1,$2,$3)
        RETURNING id, full_name, email, created_at
        `,
        [fullName, email, passwordHash]
    );

    return rows[0];
}
/**
 * Find User By Google ID
 */
async function findUserByGoogleId(googleId) {
    const { rows } = await db.query(
        `
        SELECT *
        FROM users
        WHERE google_id = $1
        LIMIT 1
        `,
        [googleId]
    );
    return rows[0];
}

/**
 * Create User with Google (password_hash is NULL)
 */
async function createUserWithGoogle(fullName, email, googleId) {
    const { rows } = await db.query(
        `
        INSERT INTO users (
            full_name,
            email,
            password_hash,
            google_id
        )
        VALUES ($1, $2, NULL, $3)
        RETURNING id, full_name, email, google_id, created_at
        `,
        [fullName, email, googleId]
    );
    return rows[0];
}

/**
 * Update existing user with Google ID (for users who signed up normally first)
 */
async function updateUserGoogleId(userId, googleId) {
    const { rows } = await db.query(
        `
        UPDATE users
        SET google_id = $2
        WHERE id = $1
        RETURNING id, full_name, email, google_id, created_at
        `,
        [userId, googleId]
    );
    return rows[0];
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    findUserByGoogleId,    // ✅ NEW
    createUserWithGoogle,  // ✅ NEW
    updateUserGoogleId,    // ✅ NEW
};