const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        headline: {
            type: String,
            trim: true,
            maxlength: 150
        },

        bio: {
            type: String,
            trim: true,
            maxlength: 1000
        },

        profileImage: {
            type: String,
            default: null
        },

        coverImage: {
            type: String,
            default: null
        },

        profileImagePublicId: {
            type: String,
            default: null
        },

        coverImagePublicId: {
            type: String,
            default: null
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

        website: {
            type: String,
            trim: true
        },

        company: {
            type: String,
            trim: true,
            maxlength: 150
        },

        jobTitle: {
            type: String,
            trim: true,
            maxlength: 150
        },

        address: {
            type: String,
            trim: true,
            maxlength: 300
        },

        city: {
            type: String,
            trim: true,
            maxlength: 100
        },

        state: {
            type: String,
            trim: true,
            maxlength: 100
        },

        country: {
            type: String,
            trim: true,
            maxlength: 100
        },

        theme: {
            template: {
                type: String,
                default: "modern"
            },

            primaryColor: {
                type: String,
                default: "#000000"
            },

            secondaryColor: {
                type: String,
                default: "#ffffff"
            },

            fontFamily: {
                type: String,
                default: "Inter"
            },

            buttonStyle: {
                type: String,
                default: "rounded"
            }
        },

        isPublished: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model("Card", cardSchema);