const express = require("express");

const urlController = require("../controllers/url.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * Create Short URL
 */
router.post(
    "/shorten",
    authenticate,
    urlController.createShortUrl
);

/**
 * Get Dashboard Statistics
 */
router.get(
    "/dashboard-stats",
    authenticate,
    urlController.getDashboardStats
);

/**
 * Get Current User URLs
 */
router.get(
    "/my-urls",
    authenticate,
    urlController.getUserUrls
);

/**
 * Get URL Analytics
 */
router.get(
    "/:id/analytics",
    authenticate,
    urlController.getUrlAnalytics
);

/**
 * Delete URL
 */
router.delete(
    "/:id",
    authenticate,
    urlController.deleteUrl
);

module.exports = router;