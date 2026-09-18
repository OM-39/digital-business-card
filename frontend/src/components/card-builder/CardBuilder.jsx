import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import {
    createCard,
    getCard,
    updateCard,
    reorderSocialLinks,
    publishCard
} from "../../services/cardService";

import BuilderHeader
    from "./BuilderHeader";

import CardForm
    from "./CardForm";

import CardPreview
    from "./CardPreview";

import {
    uploadProfileImage,
    uploadCoverImage
} from "../../services/cardService";

import SocialLinks
    from "./SocialLinks";

import {
    getSocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    toggleSocialLinkVisibility
} from "../../services/cardService";

import DesignPanel
    from "./DesignPanel";

const initialForm = {
    name: "",
    headline: "",
    bio: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    jobTitle: "",
    address: "",
    city: "",
    state: "",
    country: ""
};

const CardBuilder = ({
    mode = "create",
    cardId = null
}) => {

    const navigate =
        useNavigate();

    const isEdit =
        mode === "edit";


    const [form, setForm] =
        useState(initialForm);

    const initialTheme = {
        template: "modern",
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        fontFamily: "Inter",
        buttonStyle: "rounded"
    };

    const [theme, setTheme] =
        useState(initialTheme);

    const [loading, setLoading] =
        useState(isEdit);

    const [saving, setSaving] =
        useState(false);

    const [saved, setSaved] =
        useState(false);

    const [profileImage, setProfileImage] =
        useState(null);

    const [coverImage, setCoverImage] =
        useState(null);

    const [uploadingProfile, setUploadingProfile] =
        useState(false);

    const [uploadingCover, setUploadingCover] =
        useState(false);

    const [socialLinks, setSocialLinks] =
        useState([]);

    const [socialLinksLoading, setSocialLinksLoading] =
        useState(false);

    const [publishing, setPublishing] =
        useState(false);

    const [isPublished, setIsPublished] =
        useState(false);


    /*
     * LOAD CARD
     */

    useEffect(() => {

        if (!isEdit || !cardId) {
            return;
        }

        const loadCard = async () => {

            try {

                setLoading(true);

                const response =
                    await getCard(cardId);

                const card =
                    response.card;

                setForm({
                    name:
                        card.name || "",

                    headline:
                        card.headline || "",

                    bio:
                        card.bio || "",

                    email:
                        card.email || "",

                    phone:
                        card.phone || "",

                    website:
                        card.website || "",

                    company:
                        card.company || "",

                    jobTitle:
                        card.jobTitle || "",

                    address:
                        card.address || "",

                    city:
                        card.city || "",

                    state:
                        card.state || "",

                    country:
                        card.country || ""
                });
                setProfileImage(
                    card.profileImage || null
                );

                setCoverImage(
                    card.coverImage || null
                );

                setTheme({
                    template:
                        card.theme?.template ||
                        "modern",

                    primaryColor:
                        card.theme?.primaryColor ||
                        "#000000",

                    secondaryColor:
                        card.theme?.secondaryColor ||
                        "#ffffff",

                    fontFamily:
                        card.theme?.fontFamily ||
                        "Inter",

                    buttonStyle:
                        card.theme?.buttonStyle ||
                        "rounded"
                });

                setIsPublished(
                    card.isPublished || false
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load card"
                );

                navigate("/cards");

            } finally {

                setLoading(false);

            }
        };

        loadCard();

    }, [
        isEdit,
        cardId,
        navigate
    ]);

    useEffect(() => {

        if (!isEdit || !cardId) {
            return;
        }

        const loadSocialLinks = async () => {

            try {

                setSocialLinksLoading(true);

                const response =
                    await getSocialLinks(cardId);

                setSocialLinks(
                    response.links || []
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load social links"
                );

            } finally {

                setSocialLinksLoading(false);

            }
        };

        loadSocialLinks();

    }, [
        isEdit,
        cardId
    ]);

    /*
     * FORM CHANGE
     */

    const handlePublish = async () => {

        if (!isEdit || !cardId) {
            return;
        }

        try {

            setPublishing(true);

            const response =
                await publishCard(cardId);

            setIsPublished(
                response.isPublished
            );

            toast.success(
                response.isPublished
                    ? "Card published successfully"
                    : "Card unpublished successfully"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to update publish status"
            );

        } finally {

            setPublishing(false);

        }
    };

    const handleThemeChange = (
        property,
        value
    ) => {

        setTheme(previous => ({
            ...previous,
            [property]: value
        }));

        setSaved(false);
    };

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));

        setSaved(false);
    };

    const handleAddSocialLink = async (
        data
    ) => {

        try {

            const response =
                await createSocialLink(
                    cardId,
                    {
                        ...data,
                        displayOrder:
                            socialLinks.length
                    }
                );

            setSocialLinks(previous => [
                ...previous,
                response.link
            ]);

            toast.success(
                "Social link added"
            );

            return response.link;

        } catch (error) {

    const response =
        error?.response;

    if (
        response?.status === 403 &&
        response?.data?.code ===
            "SOCIAL_LINK_LIMIT_REACHED"
    ) {

        toast.error(
            response.data.message
        );

        return;
    }

    toast.error(
        response?.data?.message ||
        "Failed to add social link"
    );
}
    };

    const handleUpdateSocialLink = async (
        linkId,
        data
    ) => {

        try {

            const response =
                await updateSocialLink(
                    cardId,
                    linkId,
                    data
                );

            setSocialLinks(previous =>
                previous.map(link =>
                    link._id === linkId
                        ? response.link
                        : link
                )
            );

            toast.success(
                "Social link updated"
            );

            return response.link;

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to update social link"
            );

            throw error;
        }
    };


    const handleDeleteSocialLink = async (
        linkId
    ) => {

        try {

            await deleteSocialLink(
                cardId,
                linkId
            );

            setSocialLinks(previous =>
                previous.filter(
                    link =>
                        link._id !== linkId
                )
            );

            toast.success(
                "Social link removed"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to remove social link"
            );

            throw error;
        }
    };

    const handleToggleSocialLinkVisibility =
        async (
            linkId
        ) => {

            try {

                const response =
                    await toggleSocialLinkVisibility(
                        cardId,
                        linkId
                    );

                setSocialLinks(previous =>
                    previous.map(link =>
                        link._id === linkId
                            ? {
                                ...link,
                                isVisible:
                                    response.isVisible
                            }
                            : link
                    )
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Unable to change visibility"
                );

                throw error;
            }
        };


    /*
     * SAVE
     */

    const handleSave = async () => {

        if (!form.name.trim()) {

            toast.error(
                "Please enter your name"
            );

            return;
        }

        try {

            setSaving(true);

            setSaved(false);

            let response;

            if (isEdit) {

                response =
                    await updateCard(
                        cardId,
                        {
                            ...form,
                            theme
                        }
                    );

            } else {

                response =
                    await createCard(
                        {
                            ...form,
                            theme
                        }
                    );

            }

            if (isEdit) {

                setSaved(true);

                toast.success(
                    "Changes saved"
                );

            } else {

                toast.success(
                    "Card created successfully"
                );

                navigate(
                    `/cards/${response.card._id}/edit`
                );
            }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to save card"
            );

        } finally {

            setSaving(false);

        }
    };

    const handleReorderSocialLinks = async (
        reorderedLinks
    ) => {

        const updatedLinks =
            reorderedLinks.map(
                (
                    link,
                    index
                ) => ({
                    ...link,
                    displayOrder: index
                })
            );


        // Update UI immediately
        setSocialLinks(
            updatedLinks
        );


        try {

            await reorderSocialLinks(
                cardId,
                updatedLinks.map(
                    link => ({
                        id: link._id,
                        displayOrder:
                            link.displayOrder
                    })
                )
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to save new order"
            );


            // Reload server order
            try {

                const response =
                    await getSocialLinks(
                        cardId
                    );

                setSocialLinks(
                    response.links || []
                );

            } catch (
            reloadError
            ) {

                console.error(
                    reloadError
                );

            }

        }
    };

    const handleProfileImageUpload = async (
        file
    ) => {

        if (!file) {
            return;
        }

        try {

            setUploadingProfile(true);

            const response =
                await uploadProfileImage(
                    cardId,
                    file
                );

            setProfileImage(
                response.image.url
            );

            toast.success(
                "Profile photo updated"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to upload profile photo"
            );

        } finally {

            setUploadingProfile(false);

        }
    };

    const handleCoverImageUpload = async (
        file
    ) => {

        if (!file) {
            return;
        }

        try {

            setUploadingCover(true);

            const response =
                await uploadCoverImage(
                    cardId,
                    file
                );

            setCoverImage(
                response.image.url
            );

            toast.success(
                "Cover image updated"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to upload cover image"
            );

        } finally {

            setUploadingCover(false);

        }
    };

    /*
     * LOADING STATE
     */

    if (loading) {

        return (
            <div className="card-builder-loading">

                <div className="builder-loading-spinner" />

                <p>
                    Loading your card...
                </p>

            </div>
        );

    }


    return (

        <div className="card-builder">

            <BuilderHeader
                mode={mode}
                loading={saving}
                saved={saved}
                onSave={handleSave}
                isPublished={isPublished}
                publishing={publishing}
                onPublish={handlePublish}
            />


            <main className="builder-main">

                <section className="builder-editor">

                    <CardForm
                        form={form}
                        onChange={handleChange}
                        profileImage={profileImage}
                        coverImage={coverImage}
                        onProfileImageUpload={
                            handleProfileImageUpload
                        }
                        onCoverImageUpload={
                            handleCoverImageUpload
                        }
                        uploadingProfile={
                            uploadingProfile
                        }
                        uploadingCover={
                            uploadingCover
                        }
                        isEdit={isEdit}
                    />

                    <DesignPanel
                        theme={theme}
                        onChange={handleThemeChange}
                    />

                    {isEdit && (
                        <SocialLinks
                            cardId={cardId}
                            links={socialLinks}
                            loading={socialLinksLoading}
                            onAdd={handleAddSocialLink}
                            onUpdate={handleUpdateSocialLink}
                            onDelete={handleDeleteSocialLink}
                            onToggleVisibility={
                                handleToggleSocialLinkVisibility
                            }
                            onReorder={
                                handleReorderSocialLinks
                            }
                        />
                    )}

                </section>


                <CardPreview
                    form={form}
                    profileImage={profileImage}
                    coverImage={coverImage}
                    socialLinks={socialLinks}
                    theme={theme}
                />

            </main>

        </div>

    );
};


export default CardBuilder;