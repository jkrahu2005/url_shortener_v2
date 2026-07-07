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

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
};