const {
    body
} = require("express-validator");

const registerValidator = [
    body("name")
        .trim()
        .isLength({
            min: 2,
            max: 100
        })
        .withMessage(
            "Name must be between 2 and 100 characters"
        ),

    body("email")
        .trim()
        .isEmail()
        .withMessage(
            "Please provide a valid email"
        )
        .normalizeEmail(),

    body("password")
        .isLength({
            min: 8,
            max: 100
        })
        .withMessage(
            "Password must be between 8 and 100 characters"
        )
];

const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage(
            "Please provide a valid email"
        )
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage(
            "Password is required"
        )
];

module.exports = {
    registerValidator,
    loginValidator
};