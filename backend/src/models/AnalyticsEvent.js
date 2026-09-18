const mongoose = require("mongoose");

const analyticsEventSchema = new mongoose.Schema(
    {
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        },

        eventType: {
            type: String,
            enum: [
                "page_view",
                "qr_scan",
                "link_click",
                "phone_click",
                "email_click",
                "website_click",
                "social_click",
                "lead_submit",
                "vcard_download",
                "share"
            ],
            required: true
        },

        visitorId: {
            type: String,
            index: true
        },

        sessionId: {
            type: String
        },

        target: {
            type: String
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        ipAddress: {
            type: String
        },

        userAgent: {
            type: String
        },

        referrer: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

analyticsEventSchema.index({
    cardId: 1,
    createdAt: -1
});

analyticsEventSchema.index({
    cardId: 1,
    eventType: 1,
    createdAt: -1
});

module.exports = mongoose.model(
    "AnalyticsEvent",
    analyticsEventSchema
);