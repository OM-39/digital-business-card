import api from "./api";

export const getPlans = async () => {

    const response =
        await api.get(
            "/plans"
        );

    return response.data;
};

export const getPlanSummary =
    async () => {

        const response =
            await api.get(
                "/plans/summary"
            );

        return response.data;
    };