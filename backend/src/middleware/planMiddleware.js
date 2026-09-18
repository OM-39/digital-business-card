const Subscription =
    require("../models/Subscription");

const requireFeature =
    (featureName) => {

        return async (req, res, next) => {

            const subscription =
                await Subscription.findOne({
                    userId: req.user._id,
                    status: "active"
                }).populate("planId");

            if (!subscription) {
                return res.status(403).json({
                    success: false,
                    message:
                        "Active subscription required"
                });
            }

            const feature =
                subscription.planId
                    .features?.[featureName];

            if (!feature) {
                return res.status(403).json({
                    success: false,
                    message:
                        "This feature is not available on your plan"
                });
            }

            req.subscription =
                subscription;

            next();
        };
    };

module.exports = {
    requireFeature
};