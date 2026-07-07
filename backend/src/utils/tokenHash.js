const crypto = require("crypto");

/**
 * Hash Refresh Token using SHA256
 */
function hashToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

module.exports = {
    hashToken,
};