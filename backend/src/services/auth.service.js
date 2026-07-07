const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const userModel = require("../models/user.model");
const refreshTokenModel = require("../models/refreshToken.model");

const { hashPassword,comparePassword } = require("../utils/hash");
const { hashToken } = require("../utils/tokenHash");
const {
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    decodeToken,
} = require("../utils/jwt");
const {
    blacklistToken,
} = require("../utils/redis");

/**
 * Generate Access & Refresh Tokens
 */
async function issueTokens(user) {
    // Generate unique JWT ID
    const jti = uuidv4();

    // Generate Access Token
    const accessToken = generateAccessToken({
        id: user.id,
        jti,
    });

    // Generate Refresh Token
    const refreshToken = generateRefreshToken({
        id: user.id,
        jti,
    });

    // Decode refresh token to get expiry
    const decoded = jwt.decode(refreshToken);

    const expiresAt = new Date(decoded.exp * 1000);

    // Hash refresh token
    const refreshTokenHash = hashToken(refreshToken);

    // Store hashed refresh token
    await refreshTokenModel.createRefreshToken(
        user.id,
        refreshTokenHash,
        expiresAt
    );

    return {
        accessToken,
        refreshToken,
    };
}

/**
 * Register User
 */
async function register(fullName, email, password) {
    try {
        // Check if user already exists
        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser) {
            throw new Error("User already exists.");
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const user = await userModel.createUser(
            fullName,
            email,
            passwordHash
        );

        // Generate tokens
        const { accessToken, refreshToken } =
            await issueTokens(user);

        return {
            user,
            accessToken,
            refreshToken,
        };

    } catch (err) {
        console.error("Register Service Error:", err.message);
        throw err;
    }
}
/**
 * Login User
 */
async function login(email, password) {
    try {
        // Check if user exists
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password.");
        }

        // Compare password
        const isPasswordValid = await comparePassword(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
        }

        // Generate tokens
        const { accessToken, refreshToken } =
            await issueTokens(user);

        return {
            user,
            accessToken,
            refreshToken,
        };

    } catch (err) {
        console.error("Login Service Error:", err.message);
        throw err;
    }
}
/**
 * Refresh Access Token
 */
async function refresh(refreshToken) {
    try {
        // Delete expired refresh tokens
        await refreshTokenModel.deleteExpiredRefreshTokens();

        // Verify refresh token
        const payload = verifyRefreshToken(refreshToken);

        // Hash refresh token
        const refreshTokenHash = hashToken(refreshToken);

        // Check if refresh token exists
        const storedToken = await refreshTokenModel.findRefreshToken(
            refreshTokenHash
        );

        if (!storedToken) {
            throw new Error("Refresh token is invalid.");
        }

        // Check whether user still exists
        const user = await userModel.findUserById(payload.id);

        if (!user) {
            throw new Error("User not found.");
        }

        // Delete old refresh token (Rotation)
        await refreshTokenModel.deleteRefreshToken(
            refreshTokenHash
        );

        // Generate new tokens
        const {
            accessToken,
            refreshToken: newRefreshToken,
        } = await issueTokens(user);

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };

    } catch (err) {
        console.error("Refresh Service Error:", err.message);
        throw err;
    }
}
/**
 * Logout User
 */
/**
 * Logout User
 */
async function logout(accessToken, refreshToken) {
    try {

        // Blacklist Access Token
        if (accessToken) {

            try {

                const payload = verifyAccessToken(accessToken);

                const decoded = decodeToken(accessToken);

                const currentTime = Math.floor(Date.now() / 1000);

                const ttl = decoded.exp - currentTime;

                if (ttl > 0) {
                    await blacklistToken(
                        payload.jti,
                        ttl
                    );
                }

            } catch (err) {
                // Ignore invalid / expired access token
            }
        }

        // Delete Refresh Token
        if (refreshToken) {

            const refreshTokenHash =
                hashToken(refreshToken);

            await refreshTokenModel.deleteRefreshToken(
                refreshTokenHash
            );
        }

    } catch (err) {

        console.error(
            "Logout Service Error:",
            err.message
        );

        throw err;
    }
}

module.exports = {
    register,
    login,
    refresh,
    logout
};