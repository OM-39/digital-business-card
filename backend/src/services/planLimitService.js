const Card = require("../models/Card");
const Lead = require("../models/Lead");
const Subscription = require("../models/Subscription");


const getUserPlan = async (userId) => {

    const subscription =
        await Subscription.findOne({
            userId,
            status: {
                $in: [
                    "trialing",
                    "active",
                    "past_due"
                ]
            }
        })
        .populate("planId")
        .lean();

    if (
        !subscription ||
        !subscription.planId
    ) {
        throw new Error(
            "Active subscription not found"
        );
    }

    return subscription.planId;
};


const getCardCount = async (userId) => {

    return Card.countDocuments({
        userId,
        isActive: true
    });

};


const getLeadCountThisMonth =
    async (userId) => {

        const cards =
            await Card.find({
                userId
            })
            .select("_id");

        const cardIds =
            cards.map(
                card => card._id
            );

        if (
            cardIds.length === 0
        ) {
            return 0;
        }

        const now =
            new Date();

        const startOfMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

        return Lead.countDocuments({
            cardId: {
                $in: cardIds
            },
            createdAt: {
                $gte: startOfMonth
            }
        });
    };


const checkCardLimit =
    async (userId) => {

        const plan =
            await getUserPlan(
                userId
            );

        const limit =
            plan.limits?.cards;

        const current =
            await getCardCount(
                userId
            );

        if (
            limit === undefined ||
            limit === -1
        ) {

            return {
                allowed: true,
                limit,
                current
            };
        }

        return {
            allowed:
                current < limit,

            limit,
            current
        };
    };


const checkLeadLimit =
    async (userId) => {

        const plan =
            await getUserPlan(
                userId
            );

        const limit =
            plan.limits?.leadsPerMonth;

        const current =
            await getLeadCountThisMonth(
                userId
            );

        if (
            limit === undefined ||
            limit === -1
        ) {

            return {
                allowed: true,
                limit,
                current
            };
        }

        return {
            allowed:
                current < limit,

            limit,
            current
        };
    };


module.exports = {
    getUserPlan,
    getCardCount,
    getLeadCountThisMonth,
    checkCardLimit,
    checkLeadLimit
};