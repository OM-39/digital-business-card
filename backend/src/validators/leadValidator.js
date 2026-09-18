const {
    body
} = require("express-validator");

const leadValidator = [
    body("name")
        .trim()
        .isLength({
            min: 2,
            max: 100
        })
        .withMessage(
            "Name is required"
        ),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage(
            "Invalid email"
        ),

    body("phone")
        .optional()
        .trim()
        .isLength({
            min: 7,
            max: 20
        })
        .withMessage(
            "Invalid phone number"
        ),

    body("company")
        .optional()
        .trim()
        .isLength({
            max: 150
        }),

    body("message")
        .optional()
        .trim()
        .isLength({
            max: 1000
        })
];

module.exports = {
    leadValidator
};