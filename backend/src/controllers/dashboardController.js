const {
    getDashboardData
} = require("../services/dashboardService");

const getDashboard =
    async (req, res) => {

        try {

            const dashboard =
                await getDashboardData(
                    req.user._id
                );

            return res.status(200).json({
                success: true,
                dashboard
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Failed to load dashboard"
            });
        }
    };

module.exports = {
    getDashboard
};