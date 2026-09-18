const Card = require("../models/Card");

const {
    uploadImage,
    deleteImage
} = require("../services/uploadService");


const uploadProfileImage = async (
    req,
    res
) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message:
                    "Please select an image"
            });

        }

        const card =
            await Card.findOne({
                _id: req.params.id,
                userId: req.user._id
            });

        if (!card) {

            return res.status(404).json({
                success: false,
                message:
                    "Card not found"
            });

        }


        // Delete previous image
        if (
            card.profileImagePublicId
        ) {

            await deleteImage(
                card.profileImagePublicId
            );

        }


        // Upload new image
        const result =
            await uploadImage(
                req.file.buffer,
                "cardly/profile-images"
            );


        card.profileImage =
            result.secure_url;

        card.profileImagePublicId =
            result.public_id;


        await card.save();


        return res.status(200).json({

            success: true,

            message:
                "Profile image uploaded successfully",

            image: {
                url:
                    result.secure_url,

                publicId:
                    result.public_id
            }

        });

    } catch (error) {

        console.error(
            "Profile image upload error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to upload profile image"

        });

    }
};


const uploadCoverImage = async (
    req,
    res
) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message:
                    "Please select an image"
            });

        }

        const card =
            await Card.findOne({
                _id: req.params.id,
                userId: req.user._id
            });

        if (!card) {

            return res.status(404).json({
                success: false,
                message:
                    "Card not found"
            });

        }


        // Delete previous image
        if (
            card.coverImagePublicId
        ) {

            await deleteImage(
                card.coverImagePublicId
            );

        }


        // Upload new image
        const result =
            await uploadImage(
                req.file.buffer,
                "cardly/cover-images"
            );


        card.coverImage =
            result.secure_url;

        card.coverImagePublicId =
            result.public_id;


        await card.save();


        return res.status(200).json({

            success: true,

            message:
                "Cover image uploaded successfully",

            image: {
                url:
                    result.secure_url,

                publicId:
                    result.public_id
            }

        });

    } catch (error) {

        console.error(
            "Cover image upload error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to upload cover image"

        });

    }
};


module.exports = {
    uploadProfileImage,
    uploadCoverImage
};