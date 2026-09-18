const {
    getUserProfile,
    updateUserProfile,
    changePassword
} = require("../services/userService");


const getProfile =
    async (req, res) => {

        try {

            const user =
                await getUserProfile(
                    req.user._id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            return res.status(200).json({
                success: true,
                user
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Failed to load profile"
            });

        }

    };


const updateProfile =
    async (req, res) => {

        try {

            const user =
                await updateUserProfile(
                    req.user._id,
                    req.body
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            return res.status(200).json({

                success: true,

                message:
                    "Profile updated successfully",

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role
                }

            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    };


const updatePassword =
    async (req, res) => {

        try {

            const {
                currentPassword,
                newPassword
            } = req.body;

            await changePassword(
                req.user._id,
                currentPassword,
                newPassword
            );

            return res.status(200).json({

                success: true,

                message:
                    "Password changed successfully"

            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    };


module.exports = {
    getProfile,
    updateProfile,
    updatePassword
};