const {
    getPlansForUser,
    getUserPlanSummary
} = require("../services/planService");

const getPlans = async (
    req,
    res
) => {

    try {

        const result =
            await getPlansForUser(
                req.user._id
            );

        return res.status(200).json({
            success: true,
            plans: result.plans,
            subscription:
                result.subscription
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Failed to load plans"
        });
    }
};

const getSummary = async (
    req,
    res
) => {

    try {

        const summary =
            await getUserPlanSummary(
                req.user._id
            );

        return res.status(200).json({
            success: true,
            ...summary
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Failed to load plan summary"
        });

    }

};

module.exports = {
    getPlans,
    getSummary
};