import api from "./api";

export const getLeads = async () => {

    const response =
        await api.get("/leads");

    return response.data;
};


export const getLead = async (
    id
) => {

    const response =
        await api.get(
            `/leads/${id}`
        );

    return response.data;
};


export const updateLeadStatus =
    async (
        id,
        status
    ) => {

        const response =
            await api.patch(
                `/leads/${id}/status`,
                {
                    status
                }
            );

        return response.data;
    };


export const deleteLead = async (
    id
) => {

    const response =
        await api.delete(
            `/leads/${id}`
        );

    return response.data;
};

export const submitLead = async (
    cardId,
    data
) => {

    const response =
        await api.post(
            `/leads/${cardId}`,
            data
        );

    return response.data;
};