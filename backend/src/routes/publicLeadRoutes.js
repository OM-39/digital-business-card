const express = require("express");

const {
    create
} = require("../controllers/leadController");

const {
    publicLimiter
} = require("../middleware/rateLimiters");

const {
    leadValidator
} = require("../validators/leadValidator");

const validate =
    require("../middleware/validate");

const router = express.Router();

router.post(
    "/cards/:cardId/leads",
    publicLimiter,
    leadValidator,
    validate,
    create
);

module.exports = router;