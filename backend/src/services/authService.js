const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

const registerUser = async ({
    name,
    email,
    password
}) => {

    const existingUser =
        await User.findOne({ email });

    if (existingUser) {
        throw new Error(
            "An account with this email already exists"
        );
    }

    const passwordHash =
        await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        passwordHash
    });

    const freePlan =
        await Plan.findOne({
            slug: "free",
            isActive: true
        });

    if (!freePlan) {
        throw new Error(
            "Free plan is not configured"
        );
    }

    const now = new Date();

    const periodEnd = new Date(now);

    periodEnd.setMonth(
        periodEnd.getMonth() + 1
    );

    await Subscription.create({
        userId: user._id,
        planId: freePlan._id,
        status: "active",
        startDate: now,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
        throw new Error("This account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
        {
            userId: user._id.toString(),
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        user,
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};