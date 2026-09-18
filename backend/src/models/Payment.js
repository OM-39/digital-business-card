const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription",
            required: true
        },

        provider: {
            type: String,
            required: true
        },

        transactionId: {
            type: String,
            required: true,
            unique: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: "INR"
        },

        status: {
            type: String,
            enum: [
                "pending",
                "successful",
                "failed",
                "refunded"
            ],
            default: "pending"
        },

        paymentDate: {
            type: Date,
            required: true
        },

        invoiceUrl: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment", paymentSchema);