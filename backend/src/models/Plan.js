const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        description: {
            type: String,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: "INR"
        },

        billingInterval: {
            type: String,
            enum: ["month", "year", "one_time"],
            default: "month"
        },

        isPopular: {
            type: Boolean,
            default: false
        },

        features: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        limits: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Plan", planSchema);