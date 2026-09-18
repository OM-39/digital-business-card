const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        email: {
            type: String,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            trim: true
        },

        company: {
            type: String,
            trim: true
        },

        message: {
            type: String,
            trim: true,
            maxlength: 1000
        },

        source: {
            type: String,
            enum: ["card", "qr", "share", "direct"],
            default: "card"
        },

        status: {
            type: String,
            enum: [
                "new",
                "contacted",
                "qualified",
                "converted",
                "archived"
            ],
            default: "new"
        }
    },
    {
        timestamps: true
    }
);

leadSchema.index({
    cardId: 1,
    createdAt: -1
});

module.exports = mongoose.model("Lead", leadSchema);