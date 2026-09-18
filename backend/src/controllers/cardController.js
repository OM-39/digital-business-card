const {
    createCard,
    getUserCards,
    getUserCard,
    updateCard,
    deleteCard,
    togglePublish,
    getPublicCard
} = require("../services/cardService");

const {
    checkCardLimit
} = require("../services/planLimitService");

const create = async (req, res) => {

    try {

        const {
            name
        } = req.body;


        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Name is required"
            });

        }


        // Check plan card limit
        const cardLimit =
            await checkCardLimit(
                req.user._id
            );


        if (!cardLimit.allowed) {

            return res.status(403).json({

                success: false,

                code:
                    "CARD_LIMIT_REACHED",

                message:
                    `Your plan allows ${cardLimit.limit} card(s). Please upgrade your plan.`

            });

        }


        // Create card only after
        // passing the plan limit check
        const card = await createCard(
            req.user._id,
            req.body
        );


        return res.status(201).json({

            success: true,

            message:
                "Card created successfully",

            card

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};

const getAll = async (req, res) => {
    try {
        const cards = await getUserCards(req.user._id);

        return res.status(200).json({
            success: true,
            count: cards.length,
            cards
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch cards"
        });
    }
};

const getOne = async (req, res) => {
    try {
        const card = await getUserCard(
            req.user._id,
            req.params.id
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        return res.status(200).json({
            success: true,
            card
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid card ID"
        });
    }
};

const update = async (req, res) => {
    try {
        const card = await updateCard(
            req.user._id,
            req.params.id,
            req.body
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Card updated successfully",
            card
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const card = await deleteCard(
            req.user._id,
            req.params.id
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Card deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const publish = async (req, res) => {
    try {
        const card = await togglePublish(
            req.user._id,
            req.params.id
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: card.isPublished
                ? "Card published successfully"
                : "Card unpublished successfully",
            isPublished: card.isPublished
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const publicCard = async (req, res) => {
    try {
        const card = await getPublicCard(
            req.params.slug
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        return res.status(200).json({
            success: true,
            card
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch public card"
        });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove,
    publish,
    publicCard
};