require("dotenv").config();

const connectDB = require("../config/db");
const Plan = require("../models/Plan");

const plans = [

    // FREE
    {
        name: "Free",
        slug: "free",

        description:
            "Everything you need to get started.",

        price: 0,
        currency: "INR",

        billingInterval: "month",

        isPopular: false,

        features: [
            "1 digital business card",
            "QR code",
            "Basic analytics",
            "Lead capture"
        ],

        limits: {
            cards: 1,
            socialLinksPerCard: 3,
            leadsPerMonth: 10
        },

        isActive: true
    },


    // PRO MONTHLY
    {
        name: "Pro",
        slug: "pro-monthly",

        description:
            "For professionals building their network.",

        price: 99,
        currency: "INR",

        billingInterval: "month",

        isPopular: false,

        features: [
            "5 digital business cards",
            "Advanced analytics",
            "QR code",
            "Lead capture",
            "10 social links per card"
        ],

        limits: {
            cards: 5,
            socialLinksPerCard: 10,
            leadsPerMonth: 100
        },

        isActive: true
    },


    // PRO YEARLY
    {
        name: "Pro",
        slug: "pro-yearly",

        description:
            "For professionals building their network.",

        price: 999,
        currency: "INR",

        billingInterval: "year",

        isPopular: true,

        features: [
            "5 digital business cards",
            "Advanced analytics",
            "QR code",
            "Lead capture",
            "10 social links per card",
            "Remove Cardly branding"
        ],

        limits: {
            cards: 5,
            socialLinksPerCard: 10,
            leadsPerMonth: 100
        },

        isActive: true
    },


    // BUSINESS MONTHLY
    {
        name: "Business",
        slug: "business-monthly",

        description:
            "For growing businesses and teams.",

        price: 199,
        currency: "INR",

        billingInterval: "month",

        isPopular: false,

        features: [
            "Unlimited digital business cards",
            "Advanced analytics",
            "Unlimited social links",
            "Unlimited leads",
            "Custom branding"
        ],

        limits: {
            cards: -1,
            socialLinksPerCard: -1,
            leadsPerMonth: -1
        },

        isActive: true
    },


    // BUSINESS YEARLY
    {
        name: "Business",
        slug: "business-yearly",

        description:
            "For growing businesses and teams.",

        price: 1999,
        currency: "INR",

        billingInterval: "year",

        isPopular: false,

        features: [
            "Unlimited digital business cards",
            "Advanced analytics",
            "Unlimited social links",
            "Unlimited leads",
            "Custom branding",
            "Priority support"
        ],

        limits: {
            cards: -1,
            socialLinksPerCard: -1,
            leadsPerMonth: -1
        },

        isActive: true
    }

];

seedPlans();