import api from "./api";

export const createCard = async (data) => {

    const response = await api.post(
        "/cards",
        data
    );

    return response.data;
};

export const getCards = async () => {

    const response = await api.get(
        "/cards"
    );

    return response.data;
};

export const getCard = async (id) => {

    const response = await api.get(
        `/cards/${id}`
    );

    return response.data;
};

export const updateCard = async (
    id,
    data
) => {

    const response = await api.put(
        `/cards/${id}`,
        data
    );

    return response.data;
};

export const publishCard = async (
    id
) => {

    const response = await api.patch(
        `/cards/${id}/publish`
    );

    return response.data;
};

export const deleteCard = async (
    id
) => {

    const response = await api.delete(
        `/cards/${id}`
    );

    return response.data;
};

export const uploadProfileImage = async (
    cardId,
    file
) => {

    const formData =
        new FormData();

    formData.append(
        "image",
        file
    );

    const response =
        await api.post(
            `/upload/cards/${cardId}/profile-image`,
            formData
        );

    return response.data;
};


export const uploadCoverImage = async (
    cardId,
    file
) => {

    const formData =
        new FormData();

    formData.append(
        "image",
        file
    );

    const response =
        await api.post(
            `/upload/cards/${cardId}/cover-image`,
            formData
        );

    return response.data;
};

export const getSocialLinks = async (
    cardId
) => {

    const response =
        await api.get(
            `/cards/${cardId}/social-links`
        );

    return response.data;
};


export const createSocialLink = async (
    cardId,
    data
) => {

    const response =
        await api.post(
            `/cards/${cardId}/social-links`,
            data
        );

    return response.data;
};


export const updateSocialLink = async (
    cardId,
    linkId,
    data
) => {

    const response =
        await api.put(
            `/cards/${cardId}/social-links/${linkId}`,
            data
        );

    return response.data;
};


export const deleteSocialLink = async (
    cardId,
    linkId
) => {

    const response =
        await api.delete(
            `/cards/${cardId}/social-links/${linkId}`
        );

    return response.data;
};


export const toggleSocialLinkVisibility =
    async (
        cardId,
        linkId
    ) => {

        const response =
            await api.patch(
                `/cards/${cardId}/social-links/${linkId}/visibility`
            );

        return response.data;
    };

export const reorderSocialLinks = async (
    cardId,
    links
) => {

    const response =
        await api.patch(
            `/cards/${cardId}/social-links/reorder`,
            {
                links
            }
        );

    return response.data;
};

export const getPublicCard = async (
    slug
) => {

    const response =
        await api.get(
            `/public/cards/${slug}`
        );

    return response.data;
};