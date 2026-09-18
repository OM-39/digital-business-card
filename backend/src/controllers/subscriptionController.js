const {
    getUserSubscription
} = require("../services/subscriptionService");

const getMySubscription =
    async (req, res) => {

        try {
            const subscription =
                await getUserSubscription(
                    req.user._id
                );

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message:
                        "No active subscription found"
                });
            }

            return res.status(200).json({
                success: true,
                subscription
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    "Failed to fetch subscription"
            });
        }
    };

module.exports = {
    getMySubscription
};