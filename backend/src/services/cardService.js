const Card = require("../models/Card");
const SocialLink = require("../models/SocialLink");

const createCard = async (userId, data) => {

    const baseSlug = data.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    let slug = baseSlug || "card";
    let counter = 1;

    while (
        await Card.exists({ slug })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    const card = await Card.create({
        userId,

        name: data.name,

        slug,

        headline: data.headline,

        bio: data.bio,

        profileImage: data.profileImage,

        coverImage: data.coverImage,

        email: data.email,

        phone: data.phone,

        website: data.website,

        company: data.company,

        jobTitle: data.jobTitle,

        address: data.address,

        city: data.city,

        state: data.state,

        country: data.country,

        theme: data.theme
    });

    return card;
};

const getUserCards = async (userId) => {
    return Card.find({ userId })
        .sort({ createdAt: -1 });
};

const getUserCard = async (userId, cardId) => {
    return Card.findOne({
        _id: cardId,
        userId
    });
};

const updateCard = async (userId, cardId, data) => {
    const allowedFields = [
        "name",
        "slug",
        "headline",
        "bio",
        "profileImage",
        "coverImage",
        "email",
        "phone",
        "website",
        "company",
        "jobTitle",
        "address",
        "city",
        "state",
        "country",
        "theme"
    ];

    const updates = {};

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updates[field] = data[field];
        }
    }

    return Card.findOneAndUpdate(
        {
            _id: cardId,
            userId
        },
        updates,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteCard = async (userId, cardId) => {
    const card = await Card.findOneAndDelete({
        _id: cardId,
        userId
    });

    if (card) {
        await SocialLink.deleteMany({
            cardId: card._id
        });
    }

    return card;
};

const togglePublish = async (userId, cardId) => {
    const card = await Card.findOne({
        _id: cardId,
        userId
    });

    if (!card) {
        return null;
    }

    card.isPublished = !card.isPublished;

    await card.save();

    return card;
};

const getPublicCard = async (slug) => {
    const card = await Card.findOne({
        slug,
        isPublished: true,
        isActive: true
    }).lean();

    if (!card) {
        return null;
    }

    const socialLinks = await SocialLink.find({
        cardId: card._id,
        isVisible: true
    })
        .sort({ displayOrder: 1 })
        .lean();

    return {
        ...card,
        socialLinks
    };
};

module.exports = {
    createCard,
    getUserCards,
    getUserCard,
    updateCard,
    deleteCard,
    togglePublish,
    getPublicCard
};