const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

/**
 * Hash Password
 */
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare Password
 */
async function comparePassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
}

module.exports = {
    hashPassword,
    comparePassword,
};