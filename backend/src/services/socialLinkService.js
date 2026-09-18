const SocialLink = require("../models/SocialLink");
const Card = require("../models/Card");
const {
    getUserPlan
} = require("./planLimitService");

const verifyCardOwnership = async (cardId, userId) => {
    return Card.findOne({
        _id: cardId,
        userId
    });
};

const createSocialLink = async (
    userId,
    cardId,
    data
) => {

    const card =
        await verifyCardOwnership(
            cardId,
            userId
        );

    if (!card) {
        throw new Error(
            "Card not found"
        );
    }


    // Get user's current plan
    const plan =
        await getUserPlan(
            userId
        );


    const limit =
        plan.limits
            ?.socialLinksPerCard;


    // Unlimited
    if (
        limit !== undefined &&
        limit !== -1
    ) {

        const currentCount =
            await SocialLink.countDocuments({
                cardId
            });


        if (
            currentCount >= limit
        ) {

            throw new Error(
                `Your ${plan.name} plan allows ${limit} social links per card. Please upgrade your plan.`
            );

        }

    }


    return SocialLink.create({

        cardId,

        platform:
            data.platform,

        url:
            data.url,

        username:
            data.username,

        label:
            data.label,

        displayOrder:
            data.displayOrder

    });
};

const getSocialLinks = async (userId, cardId) => {
    const card = await verifyCardOwnership(cardId, userId);

    if (!card) {
        throw new Error("Card not found");
    }

    return SocialLink.find({ cardId })
        .sort({ displayOrder: 1 });
};

const updateSocialLink = async (
    userId,
    cardId,
    linkId,
    data
) => {
    const card = await verifyCardOwnership(cardId, userId);

    if (!card) {
        throw new Error("Card not found");
    }

    return SocialLink.findOneAndUpdate(
        {
            _id: linkId,
            cardId
        },
        {
            platform: data.platform,
            url: data.url,
            username: data.username,
            label: data.label,
            displayOrder: data.displayOrder
        },
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteSocialLink = async (
    userId,
    cardId,
    linkId
) => {
    const card = await verifyCardOwnership(cardId, userId);

    if (!card) {
        throw new Error("Card not found");
    }

    return SocialLink.findOneAndDelete({
        _id: linkId,
        cardId
    });
};

const toggleVisibility = async (
    userId,
    cardId,
    linkId
) => {
    const card = await verifyCardOwnership(cardId, userId);

    if (!card) {
        throw new Error("Card not found");
    }

    const link = await SocialLink.findOne({
        _id: linkId,
        cardId
    });

    if (!link) {
        return null;
    }

    link.isVisible = !link.isVisible;

    await link.save();

    return link;
};

const reorderSocialLinks = async (
    userId,
    cardId,
    links
) => {

    const card =
        await verifyCardOwnership(
            cardId,
            userId
        );

    if (!card) {
        throw new Error(
            "Card not found"
        );
    }

    if (!Array.isArray(links)) {
        throw new Error(
            "Invalid links data"
        );
    }

    const operations =
        links.map(link => ({
            updateOne: {
                filter: {
                    _id: link.id,
                    cardId
                },
                update: {
                    $set: {
                        displayOrder:
                            Number(
                                link.displayOrder
                            )
                    }
                }
            }
        }));


    if (operations.length > 0) {

        await SocialLink.bulkWrite(
            operations
        );

    }


    const savedLinks =
        await SocialLink
            .find({
                cardId
            })
            .sort({
                displayOrder: 1
            });

    return savedLinks;
};

module.exports = {
    createSocialLink,
    getSocialLinks,
    updateSocialLink,
    deleteSocialLink,
    toggleVisibility,
    reorderSocialLinks
};