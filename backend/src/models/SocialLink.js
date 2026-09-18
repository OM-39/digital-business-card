const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema(
    {
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: true,
            index: true
        },

        platform: {
            type: String,
            enum: [
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
            ],
            required: true
        },

        url: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            trim: true
        },

        label: {
            type: String,
            trim: true
        },

        displayOrder: {
            type: Number,
            default: 0
        },

        isVisible: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SocialLink", socialLinkSchema);