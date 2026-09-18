const {
    body
} = require("express-validator");

const createCardValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage(
            "Card name is required"
        )
        .isLength({
            min: 2,
            max: 100
        })
        .withMessage(
            "Card name must be between 2 and 100 characters"
        ),

    body("headline")
        .optional()
        .trim()
        .isLength({
            max: 150
        })
        .withMessage(
            "Headline cannot exceed 150 characters"
        ),

    body("bio")
        .optional()
        .trim()
        .isLength({
            max: 1000
        })
        .withMessage(
            "Bio cannot exceed 1000 characters"
        ),

    body("email")
        .optional({
            values: "falsy"
        })
        .trim()
        .isEmail()
        .withMessage(
            "Invalid card email"
        ),

    body("phone")
        .optional({
            values: "falsy"
        })
        .trim()
        .isLength({
            min: 7,
            max: 20
        })
        .withMessage(
            "Invalid phone number"
        ),

    body("website")
        .optional({
            values: "falsy"
        })
        .trim()
        .isURL({
            protocols: [
                "http",
                "https"
            ],
            require_protocol: true
        })
        .withMessage(
            "Invalid website URL"
        ),

    body("company")
        .optional()
        .trim()
        .isLength({
            max: 150
        }),

    body("jobTitle")
        .optional()
        .trim()
        .isLength({
            max: 150
        }),

    body("address")
        .optional()
        .trim()
        .isLength({
            max: 300
        }),

    body("city")
        .optional()
        .trim()
        .isLength({
            max: 100
        }),

    body("state")
        .optional()
        .trim()
        .isLength({
            max: 100
        }),

    body("country")
        .optional()
        .trim()
        .isLength({
            max: 100
        })

];

module.exports = {
    createCardValidator
};