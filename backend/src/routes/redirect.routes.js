const express = require("express");

const urlController = require("../controllers/url.controller");

const router = express.Router();

router.get(
    "/:shortCode",
    urlController.redirectUrl
);

module.exports = router;