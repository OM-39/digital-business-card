const express = require("express");

const {
    getPlans,
    getSummary
} = require("../controllers/planController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    protect,
    getPlans
);

router.get(
    "/summary",
    getSummary
);


module.exports = router;