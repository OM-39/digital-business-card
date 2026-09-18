import api from "./api";

export const trackEvent = async ({
    cardId,
    eventType,
    visitorId,
    sessionId,
    target,
    metadata
}) => {

    try {

        const response = await api.post(
            "/analytics/events",
            {
                cardId,
                eventType,
                visitorId,
                sessionId,
                target,
                metadata
            }
        );

        return response.data;

    } catch (error) {

        // Analytics should NEVER break
        // the actual card experience.

        console.error(
            "Analytics error:",
            error
        );

        return null;
    }
};

export const getAnalytics = async (
    days = 0
) => {

    const response =
        await api.get(
            `/analytics?days=${days}`
        );

    return response.data;
};

export const getAnalyticsTimeline = async (
    days = 30
) => {

    const response =
        await api.get(
            `/analytics/timeline?days=${days}`
        );

    return response.data;
};

export const getTopInteractions =
    async (days = 30) => {

        const response =
            await api.get(
                `/analytics/top-interactions?days=${days}`
            );

        return response.data;
    };
