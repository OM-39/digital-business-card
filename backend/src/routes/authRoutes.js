const express = require("express");

const {
    register,
    login,
    logout,
    getMe
} = require("../controllers/authController");

const {
    protect
} = require("../middleware/authMiddleware");

const {
    authLimiter
} = require("../middleware/rateLimiters");

const {
    registerValidator,
    loginValidator
} = require("../validators/authValidator");

const validate =
    require("../middleware/validate");

const router = express.Router();

router.post(
    "/register",
    authLimiter,
    registerValidator,
    validate,
    register
);

router.post(
    "/login",
    authLimiter,
    loginValidator,
    validate,
    login
);

router.post(
    "/logout",
    logout
);

router.get(
    "/me",
    protect,
    getMe
);

module.exports = router;