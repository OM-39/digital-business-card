const {
    createSocialLink,
    getSocialLinks,
    updateSocialLink,
    deleteSocialLink,
    toggleVisibility,
    reorderSocialLinks
} = require("../services/socialLinkService");

const create = async (req, res) => {
    try {
        const { platform, url } = req.body;

        if (!platform || !url) {
            return res.status(400).json({
                success: false,
                message: "Platform and URL are required"
            });
        }

        const link = await createSocialLink(
            req.user._id,
            req.params.cardId,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Social link added successfully",
            link
        });

    } catch (error) {

    if (
        error.message.includes(
            "social links per card"
        )
    ) {
        return res.status(403).json({
            success: false,
            code: "SOCIAL_LINK_LIMIT_REACHED",
            message: error.message
        });
    }

    return res.status(400).json({
        success: false,
        message: error.message
    });
}
};

const getAll = async (req, res) => {
    try {
        const links = await getSocialLinks(
            req.user._id,
            req.params.cardId
        );

        return res.status(200).json({
            success: true,
            count: links.length,
            links
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const link = await updateSocialLink(
            req.user._id,
            req.params.cardId,
            req.params.linkId,
            req.body
        );

        if (!link) {
            return res.status(404).json({
                success: false,
                message: "Social link not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Social link updated successfully",
            link
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
        const link = await deleteSocialLink(
            req.user._id,
            req.params.cardId,
            req.params.linkId
        );

        if (!link) {
            return res.status(404).json({
                success: false,
                message: "Social link not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Social link deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const visibility = async (req, res) => {
    try {
        const link = await toggleVisibility(
            req.user._id,
            req.params.cardId,
            req.params.linkId
        );

        if (!link) {
            return res.status(404).json({
                success: false,
                message: "Social link not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Visibility updated",
            isVisible: link.isVisible
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const reorder = async (
    req,
    res
) => {

    try {

        const {
            links
        } = req.body;


        if (
            !Array.isArray(links)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Links array is required"

            });

        }


        const updatedLinks =
            await reorderSocialLinks(
                req.user._id,
                req.params.cardId,
                links
            );


        return res.status(200).json({

            success: true,

            message:
                "Social links reordered successfully",

            links:
                updatedLinks

        });

    } catch (error) {

        console.error(
            "Reorder error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};

module.exports = {
    create,
    getAll,
    update,
    remove,
    visibility,
    reorder
};