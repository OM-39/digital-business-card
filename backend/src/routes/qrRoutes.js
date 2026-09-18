const express = require("express");

const {
    generateQR
} = require("../controllers/qrController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get(
    "/cards/:cardId/qr",
    generateQR
);

module.exports = router;