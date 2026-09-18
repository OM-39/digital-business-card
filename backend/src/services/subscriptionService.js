const Subscription =
    require("../models/Subscription");

const getUserSubscription =
    async (userId) => {

        return Subscription.findOne({
            userId,
            status: {
                $in: [
                    "trialing",
                    "active",
                    "past_due"
                ]
            }
        }).populate("planId");
    };

module.exports = {
    getUserSubscription
};