const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const {
    getUserPlan,
    getCardCount,
    getLeadCountThisMonth
} = require("./planLimitService");

const getActivePlans = async () => {
    return Plan.find({
        isActive: true
    })
        .sort({
            price: 1
        })
        .lean();
};

const getPlansForUser = async (userId) => {

    const plans = await Plan.find({
        isActive: true
    })
        .sort({
            price: 1
        })
        .lean();

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

    return {
        plans,
        subscription
    };
};

const getUserPlanSummary =
    async (userId) => {

        const plan =
            await getUserPlan(
                userId
            );

        const cards =
            await getCardCount(
                userId
            );

        const leads =
            await getLeadCountThisMonth(
                userId
            );


        return {

            plan: {
                id: plan._id,
                name: plan.name,
                slug: plan.slug,
                features: plan.features,
                limits: plan.limits
            },

            usage: {
                cards,
                leadsThisMonth:
                    leads
            }

        };

    };

module.exports = {
    getActivePlans,
    getPlansForUser,
    getUserPlanSummary
};