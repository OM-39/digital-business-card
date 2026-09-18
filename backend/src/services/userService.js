const bcrypt = require("bcryptjs");

const User = require("../models/User");


// Get current user
const getUserProfile = async (
    userId
) => {

    return User.findById(
        userId
    ).select(
        "_id name email avatar role isEmailVerified createdAt"
    );
};


// Update profile
const updateUserProfile = async (
    userId,
    data
) => {

    const user =
        await User.findById(
            userId
        );

    if (!user) {
        return null;
    }

    if (
        data.name !== undefined
    ) {

        const name =
            data.name.trim();

        if (
            name.length < 2 ||
            name.length > 100
        ) {
            throw new Error(
                "Name must be between 2 and 100 characters"
            );
        }

        user.name = name;
    }


    if (
        data.avatar !== undefined
    ) {

        user.avatar =
            data.avatar || null;
    }


    await user.save();

    return user;
};


// Change password
const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {

    if (
        !currentPassword ||
        !newPassword
    ) {
        throw new Error(
            "Current and new password are required"
        );
    }

    if (
        newPassword.length < 8
    ) {
        throw new Error(
            "New password must be at least 8 characters"
        );
    }


    const user =
        await User.findById(
            userId
        ).select(
            "+passwordHash"
        );

    if (!user) {
        return null;
    }


    const isValid =
        await bcrypt.compare(
            currentPassword,
            user.passwordHash
        );

    if (!isValid) {
        throw new Error(
            "Current password is incorrect"
        );
    }


    const samePassword =
        await bcrypt.compare(
            newPassword,
            user.passwordHash
        );

    if (samePassword) {
        throw new Error(
            "New password must be different from your current password"
        );
    }


    user.passwordHash =
        await bcrypt.hash(
            newPassword,
            12
        );

    await user.save();

    return user;
};


module.exports = {
    getUserProfile,
    updateUserProfile,
    changePassword
};