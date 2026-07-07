const jwt = require("jsonwebtoken");

/**
 * Generate Access Token
 */
function generateAccessToken(payload) {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}

/**
 * Generate Refresh Token
 */
function generateRefreshToken(payload) {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
}

/**
 * Verify Access Token
 */
function verifyAccessToken(token) {
    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );
}

/**
 * Verify Refresh Token
 */
function verifyRefreshToken(token) {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );
}
/**
 * Decode JWT
 */
function decodeToken(token) {
    return jwt.decode(token);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken
};