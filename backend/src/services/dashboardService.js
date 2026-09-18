const Card = require("../models/Card");
const Lead = require("../models/Lead");
const AnalyticsEvent =
    require("../models/AnalyticsEvent");
const Subscription =
    require("../models/Subscription");

const getDashboardData = async (userId) => {

    const cards = await Card.find({
        userId,
        isActive: true
    })
        .sort({
            createdAt: -1
        })
        .lean();

    const cardIds = cards.map(
        card => card._id
    );

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

    if (cardIds.length === 0) {
        return {
            cards: [],
            subscription,
            stats: {
                views: 0,
                uniqueVisitors: 0,
                clicks: 0,
                leads: 0
            },
            recentLeads: []
        };
    }

    const views =
        await AnalyticsEvent.countDocuments({
            cardId: {
                $in: cardIds
            },
            eventType: "page_view"
        });

    const uniqueVisitors =
        await AnalyticsEvent.distinct(
            "visitorId",
            {
                cardId: {
                    $in: cardIds
                }
            }
        );

    const clicks =
        await AnalyticsEvent.countDocuments({
            cardId: {
                $in: cardIds
            },
            eventType: {
                $in: [
                    "social_click",
                    "phone_click",
                    "email_click",
                    "website_click",
                    "vcard_download",
                    "share"
                ]
            }
        });

    const leads =
        await Lead.countDocuments({
            cardId: {
                $in: cardIds
            }
        });

    const recentLeads =
        await Lead.find({
            cardId: {
                $in: cardIds
            }
        })
        .populate(
            "cardId",
            "name slug"
        )
        .sort({
            createdAt: -1
        })
        .limit(5)
        .lean();

    return {
        cards,
        subscription,

        stats: {
            views,
            uniqueVisitors:
                uniqueVisitors.length,
            clicks,
            leads
        },

        recentLeads
    };
};

module.exports = {
    getDashboardData
};