const AnalyticsEvent = require("../models/AnalyticsEvent");

const createEvent = async ({
    cardId,
    eventType,
    visitorId,
    sessionId,
    target,
    metadata,
    ipAddress,
    userAgent,
    referrer
}) => {
    return AnalyticsEvent.create({
        cardId,
        eventType,
        visitorId,
        sessionId,
        target,
        metadata,
        ipAddress,
        userAgent,
        referrer
    });
};

const getAnalytics = async (
    cardIds,
    startDate = null
) => {

    const match = {
        cardId: {
            $in: cardIds
        }
    };

    if (startDate) {
        match.createdAt = {
            $gte: startDate
        };
    }

    const events =
        await AnalyticsEvent.aggregate([
            {
                $match: match
            },

            {
                $group: {
                    _id: "$eventType",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

    const analytics = {

        views: 0,

        uniqueVisitors: 0,

        clicks: 0,

        leads: 0,

        qrScans: 0,

        vcardDownloads: 0,

        shares: 0,

        breakdown: {

            email: 0,

            phone: 0,

            website: 0,

            social: 0

        }

    };


    for (const event of events) {

        switch (event._id) {

            case "page_view":

                analytics.views =
                    event.count;

                break;


            case "email_click":

                analytics.breakdown.email =
                    event.count;

                analytics.clicks +=
                    event.count;

                break;


            case "phone_click":

                analytics.breakdown.phone =
                    event.count;

                analytics.clicks +=
                    event.count;

                break;


            case "website_click":

                analytics.breakdown.website =
                    event.count;

                analytics.clicks +=
                    event.count;

                break;


            case "social_click":

                analytics.breakdown.social =
                    event.count;

                analytics.clicks +=
                    event.count;

                break;


            case "vcard_download":

                analytics.vcardDownloads =
                    event.count;

                analytics.clicks +=
                    event.count;

                break;


            case "share":

                analytics.shares =
                    event.count;

                analytics.clicks +=
                    event.count;

                break;


            case "qr_scan":

                analytics.qrScans =
                    event.count;

                break;

        }

    }


    const uniqueVisitors =
        await AnalyticsEvent.distinct(
            "visitorId",
            match
        );

    analytics.uniqueVisitors =
        uniqueVisitors.filter(
            Boolean
        ).length;


    const leadEvents =
        await AnalyticsEvent.countDocuments({
            ...match,
            eventType:
                "lead_submit"
        });

    analytics.leads =
        leadEvents;


    analytics.ctr =
        analytics.views > 0

            ? Number(
                (
                    analytics.clicks /
                    analytics.views
                ) * 100
            ).toFixed(2)

            : 0;


    return analytics;
};

const getAnalyticsTimeline = async (
    cardIds,
    startDate = null
) => {

    const match = {
        cardId: {
            $in: cardIds
        },
        eventType: {
            $in: [
                "page_view",
                "social_click",
                "phone_click",
                "email_click",
                "website_click",
                "vcard_download",
                "share"
            ]
        }
    };

    if (startDate) {
        match.createdAt = {
            $gte: startDate
        };
    }

    const timeline =
        await AnalyticsEvent.aggregate([
            {
                $match: match
            },

            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        },

                        eventType:
                            "$eventType"
                    },

                    count: {
                        $sum: 1
                    }
                }
            },

            {
                $sort: {
                    "_id.date": 1
                }
            }
        ]);

    const result = {};

    timeline.forEach(item => {

        const date =
            item._id.date;

        if (!result[date]) {

            result[date] = {
                date,
                views: 0,
                clicks: 0
            };

        }

        if (
            item._id.eventType ===
            "page_view"
        ) {

            result[date].views +=
                item.count;

        } else {

            result[date].clicks +=
                item.count;

        }

    });

    return Object.values(result);
};

const getTopInteractions = async (
    cardIds,
    startDate = null
) => {

    const match = {
        cardId: {
            $in: cardIds
        },
        eventType: {
            $in: [
                "social_click",
                "email_click",
                "phone_click",
                "website_click",
                "link_click"
            ]
        }
    };

    if (startDate) {
        match.createdAt = {
            $gte: startDate
        };
    }

    const interactions =
        await AnalyticsEvent.aggregate([
            {
                $match: match
            },

            {
                $group: {
                    _id: {
                        type: "$eventType",
                        target: "$target"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },

            {
                $sort: {
                    count: -1
                }
            },

            {
                $limit: 10
            }
        ]);

    return interactions.map(item => ({
        type: item._id.type,
        target:
            item._id.target ||
            item._id.type,
        count: item.count
    }));
};

module.exports = {
    createEvent,
    getAnalytics,
    getAnalyticsTimeline,
    getTopInteractions
};