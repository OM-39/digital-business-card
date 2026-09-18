const {
    body
} = require("express-validator");

const socialLinkValidator = [
    body("platform")
        .isIn([
            "linkedin",
            "instagram",
            "facebook",
            "twitter",
            "youtube",
            "github",
            "whatsapp",
            "telegram",
            "tiktok",
            "other"
        ])
        .withMessage(
            "Invalid social platform"
        ),

    body("url")
        .trim()
        .isURL()
        .withMessage(
            "Invalid social link URL"
        ),

    body("username")
        .optional()
        .trim()
        .isLength({
            max: 100
        }),

    body("label")
        .optional()
        .trim()
        .isLength({
            max: 100
        })
];

module.exports = {
    socialLinkValidator
};