const express = require("express");

const {
    getMySubscription
} = require(
    "../controllers/subscriptionController"
);

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get(
    "/me",
    getMySubscription
);

module.exports = router;