const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true
        },

        status: {
            type: String,
            enum: [
                "trialing",
                "active",
                "past_due",
                "cancelled",
                "expired"
            ],
            default: "trialing"
        },

        startDate: {
            type: Date,
            required: true
        },

        currentPeriodStart: {
            type: Date,
            required: true
        },

        currentPeriodEnd: {
            type: Date,
            required: true
        },

        cancelAtPeriodEnd: {
            type: Boolean,
            default: false
        },

        cancelledAt: {
            type: Date,
            default: null
        },

        paymentProvider: {
            type: String
        },

        providerCustomerId: {
            type: String
        },

        providerSubscriptionId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

subscriptionSchema.index({
    userId: 1,
    status: 1
});

module.exports = mongoose.model(
    "Subscription",
    subscriptionSchema
);