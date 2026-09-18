const Card = require("../models/Card");

const {
    createEvent,
    getAnalytics,
    getAnalyticsTimeline,
    getTopInteractions
} = require("../services/analyticsService");

const getTopInteractionsData =
    async (req, res) => {

        try {

            const cards =
                await Card.find({
                    userId:
                        req.user._id,

                    isActive:
                        true
                })
                .select("_id")
                .lean();

            const cardIds =
                cards.map(
                    card => card._id
                );

            const days =
                Number(
                    req.query.days
                ) || 30;

            const startDate =
                new Date();

            startDate.setDate(
                startDate.getDate() -
                days
            );

            const interactions =
                cardIds.length
                    ? await getTopInteractions(
                        cardIds,
                        startDate
                    )
                    : [];

            return res.status(200).json({
                success: true,
                interactions
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Failed to load top interactions"
            });

        }
    };

const getAnalyticsTimelineData =
    async (req, res) => {

        try {

            const cards =
                await Card.find({
                    userId:
                        req.user._id,

                    isActive:
                        true
                })
                .select("_id")
                .lean();

            const cardIds =
                cards.map(
                    card => card._id
                );

            const days =
                Number(
                    req.query.days
                ) || 30;

            const startDate =
                new Date();

            startDate.setDate(
                startDate.getDate() -
                days
            );

            const timeline =
                cardIds.length
                    ? await getAnalyticsTimeline(
                        cardIds,
                        startDate
                    )
                    : [];

            return res.status(200).json({
                success: true,
                timeline
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Failed to load analytics timeline"
            });

        }
    };

const trackEvent = async (req, res) => {
    try {
        const {
            cardId,
            eventType,
            visitorId,
            sessionId,
            target,
            metadata
        } = req.body;

        if (!cardId || !eventType) {
            return res.status(400).json({
                success: false,
                message: "cardId and eventType are required"
            });
        }

        const card = await Card.findOne({
            _id: cardId,
            isPublished: true,
            isActive: true
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        const event = await createEvent({
            cardId: card._id,
            eventType,
            visitorId,
            sessionId,
            target,
            metadata,
            ipAddress: req.ip,
            userAgent: req.get("user-agent"),
            referrer: req.get("referer")
        });

        return res.status(201).json({
            success: true,
            eventId: event._id
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to track analytics event"
        });
    }
};

const getAnalyticsData =
    async (req, res) => {

        try {

            const cards =
                await Card.find({
                    userId:
                        req.user._id,

                    isActive:
                        true
                })
                .select("_id")
                .lean();


            const cardIds =
                cards.map(
                    card => card._id
                );


            const days =
                Number(
                    req.query.days
                ) || 0;


            let startDate =
                null;


            if (days > 0) {

                startDate =
                    new Date();

                startDate.setDate(
                    startDate.getDate() -
                    days
                );

            }


            const analytics =
                cardIds.length

                    ? await getAnalytics(
                        cardIds,
                        startDate
                    )

                    : {
                        views: 0,
                        uniqueVisitors: 0,
                        clicks: 0,
                        leads: 0,
                        qrScans: 0,
                        vcardDownloads: 0,
                        shares: 0,
                        ctr: 0,
                        breakdown: {
                            email: 0,
                            phone: 0,
                            website: 0,
                            social: 0
                        }
                    };


            return res.status(200).json({

                success: true,

                analytics

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message:
                    "Failed to load analytics"

            });

        }

    };

module.exports = {
    trackEvent,
    getAnalyticsData,
    getAnalyticsTimelineData,
    getTopInteractionsData
};