const express = require("express");

const {
    trackEvent,
    getAnalyticsData,
    getAnalyticsTimelineData,
    getTopInteractionsData
} = require(
    "../controllers/analyticsController"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);

const router =
    express.Router();


router.post(
    "/events",
    trackEvent
);


router.get(
    "/",
    protect,
    getAnalyticsData
);

router.get(
    "/timeline",
    protect,
    getAnalyticsTimelineData
);

router.get(
    "/top-interactions",
    protect,
    getTopInteractionsData
);

module.exports = router;