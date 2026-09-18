import {
    useEffect,
    useState
} from "react";

import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from "@dnd-kit/sortable";

import {
    CSS
} from "@dnd-kit/utilities";

import {
    FiMove
} from "react-icons/fi";

import {
    reorderSocialLinks
} from "../../services/cardService";

import {
    FiPlus,
    FiTrash2,
    FiEye,
    FiEyeOff,
    FiExternalLink,
    FiEdit3,
    FiX,
    FiCheck
} from "react-icons/fi";

import {
    FaInstagram,
    FaLinkedinIn,
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    FaGithub,
    FaWhatsapp,
    FaTelegram,
    FaTiktok
} from "react-icons/fa6";

import {
    toast
} from "react-hot-toast";

import {
    getSocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    toggleSocialLinkVisibility
} from "../../services/cardService";


const platforms = [
    {
        value: "instagram",
        label: "Instagram",
        icon: FaInstagram
    },
    {
        value: "linkedin",
        label: "LinkedIn",
        icon: FaLinkedinIn
    },
    {
        value: "github",
        label: "GitHub",
        icon: FaGithub
    },
    {
        value: "twitter",
        label: "X",
        icon: FaXTwitter
    },
    {
        value: "facebook",
        label: "Facebook",
        icon: FaFacebookF
    },
    {
        value: "youtube",
        label: "YouTube",
        icon: FaYoutube
    },
    {
        value: "whatsapp",
        label: "WhatsApp",
        icon: FaWhatsapp
    },
    {
        value: "telegram",
        label: "Telegram",
        icon: FaTelegram
    },
    {
        value: "tiktok",
        label: "TikTok",
        icon: FaTiktok
    }
];


const emptyForm = {
    platform: "instagram",
    url: "",
    username: "",
    label: ""
};

const SortableSocialLink = ({
    link,
    platform,
    onVisibility,
    onEdit,
    onDelete
}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: link._id
    });


    const style = {

        transform:
            CSS.Transform.toString(
                transform
            ),

        transition,

        zIndex:
            isDragging
                ? 10
                : undefined

    };


    const Icon =
        platform?.icon;


    return (

        <div
            ref={setNodeRef}
            style={style}
            className={
                `social-link-card ${!link.isVisible
                    ? "is-hidden"
                    : ""
                } ${isDragging
                    ? "is-dragging"
                    : ""
                }`
            }
        >

            <button
                type="button"
                className="social-drag-handle"
                {...attributes}
                {...listeners}
                title="Drag to reorder"
            >

                <FiMove />

            </button>


            <div className="social-link-icon">

                {Icon && (
                    <Icon />
                )}

            </div>


            <div className="social-link-info">

                <strong>
                    {link.label ||
                        platform?.label ||
                        "Social link"}
                </strong>

                <span>
                    {link.username ||
                        link.url}
                </span>

            </div>


            <div className="social-link-actions">

                <button
                    type="button"
                    onClick={() =>
                        onVisibility(
                            link._id
                        )
                    }
                >

                    {link.isVisible
                        ? <FiEye />
                        : <FiEyeOff />
                    }

                </button>


                <button
                    type="button"
                    onClick={() =>
                        onEdit(link)
                    }
                >

                    <FiEdit3 />

                </button>


                <button
                    type="button"
                    onClick={() =>
                        onDelete(
                            link._id
                        )
                    }
                >

                    <FiTrash2 />

                </button>

            </div>

        </div>

    );
};

const handleDragEnd = async (
    event
) => {

    const {
        active,
        over
    } = event;

    if (!over) {
        return;
    }

    if (
        active.id ===
        over.id
    ) {
        return;
    }


    const oldIndex =
        links.findIndex(
            link =>
                link._id ===
                active.id
        );

    const newIndex =
        links.findIndex(
            link =>
                link._id ===
                over.id
        );


    const reordered =
        arrayMove(
            links,
            oldIndex,
            newIndex
        );


    const updated =
        reordered.map(
            (
                link,
                index
            ) => ({
                ...link,
                displayOrder:
                    index
            })
        );


    // Update UI immediately
    setLinks(updated);


    try {

        await reorderSocialLinks(
            cardId,
            updated.map(
                link => ({
                    id:
                        link._id,

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

        // Restore from server
        try {

            const response =
                await getSocialLinks(
                    cardId
                );

            setLinks(
                response.links || []
            );

        } catch {
            // Ignore secondary error
        }

    }

};


const SocialLinks = ({
    cardId,
    links,
    loading,
    onAdd,
    onUpdate,
    onDelete,
    onToggleVisibility,
    onReorder
}) => {

    const [saving, setSaving] =
        useState(false);

    const [showForm, setShowForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [form, setForm] =
        useState(emptyForm);


    const loadLinks = async () => {

        try {

            setLoading(true);

            const response =
                await getSocialLinks(
                    cardId
                );

            setLinks(
                response.links || []
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to load social links"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        if (cardId) {
            loadLinks();
        }

    }, [cardId]);


    const handleChange = (
        event
    ) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));
    };


    const resetForm = () => {

        setForm(
            emptyForm
        );

        setEditingId(null);

        setShowForm(false);

    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        if (!form.url.trim()) {

            toast.error(
                "Please enter a social link"
            );

            return;
        }

        try {

            setSaving(true);

            if (editingId) {

                await onUpdate(
                    editingId,
                    form
                );

            } else {

                await onAdd(
                    form
                );

            }

            resetForm();

        } catch (error) {

            // Parent already displays error.

        } finally {

            setSaving(false);

        }
    };


    const handleEdit = (
        link
    ) => {

        setEditingId(
            link._id
        );

        setForm({
            platform:
                link.platform,

            url:
                link.url || "",

            username:
                link.username || "",

            label:
                link.label || ""
        });

        setShowForm(true);

    };


    const handleDelete = async (
        linkId
    ) => {

        try {

            await onDelete(
                linkId
            );

        } catch (error) {

            // Parent handles error.

        }
    };


    const handleVisibility = async (
        linkId
    ) => {

        try {

            await onToggleVisibility(
                linkId
            );

        } catch (error) {

            // Parent handles error.

        }
    };


    const getPlatform = (
        platform
    ) => {

        return platforms.find(
            item =>
                item.value === platform
        );

    };


    return (

        <section className="social-links-section">

            <div className="builder-section-heading">

                <span>
                    05
                </span>

                <div>

                    <h2>
                        Social links
                    </h2>

                    <p>
                        Let people find you elsewhere.
                    </p>

                </div>

            </div>


            {loading ? (

                <div className="social-loading">
                    Loading social links...
                </div>

            ) : (

                <>

                    {links.length > 0 && (

                        <div className="social-link-list">

                            <DndContext
                                collisionDetection={
                                    closestCenter
                                }
                                onDragEnd={event => {

                                    const {
                                        active,
                                        over
                                    } = event;

                                    if (
                                        !over ||
                                        active.id === over.id
                                    ) {
                                        return;
                                    }

                                    const oldIndex =
                                        links.findIndex(
                                            link =>
                                                link._id ===
                                                active.id
                                        );

                                    const newIndex =
                                        links.findIndex(
                                            link =>
                                                link._id ===
                                                over.id
                                        );

                                    if (
                                        oldIndex === -1 ||
                                        newIndex === -1
                                    ) {
                                        return;
                                    }

                                    const reordered =
                                        arrayMove(
                                            links,
                                            oldIndex,
                                            newIndex
                                        );

                                    onReorder(
                                        reordered
                                    );

                                }}
                            >

                                <SortableContext
                                    items={
                                        links.map(
                                            link =>
                                                link._id
                                        )
                                    }
                                    strategy={
                                        verticalListSortingStrategy
                                    }
                                >

                                    <div className="social-link-list">

                                        {links.map(link => {

                                            const platform =
                                                getPlatform(
                                                    link.platform
                                                );

                                            return (

                                                <SortableSocialLink
                                                    key={link._id}
                                                    link={link}
                                                    platform={platform}
                                                    onVisibility={
                                                        handleVisibility
                                                    }
                                                    onEdit={
                                                        handleEdit
                                                    }
                                                    onDelete={
                                                        handleDelete
                                                    }
                                                />

                                            );

                                        })}

                                    </div>

                                </SortableContext>

                            </DndContext>

                        </div>

                    )}


                    {!showForm && (

                        <button
                            type="button"
                            className="add-social-button"
                            onClick={() =>
                                setShowForm(true)
                            }
                        >

                            <FiPlus />

                            Add social link

                        </button>

                    )}


                    {showForm && (

                        <form
                            className="social-link-form"
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="social-form-header">

                                <div>

                                    <strong>
                                        {editingId
                                            ? "Edit social link"
                                            : "Add social link"}
                                    </strong>

                                    <span>
                                        Choose a platform and add your profile.
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        resetForm
                                    }
                                >
                                    <FiX />
                                </button>

                            </div>


                            <div className="builder-field">

                                <label>
                                    Platform
                                </label>

                                <select
                                    name="platform"
                                    value={
                                        form.platform
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    {platforms.map(
                                        platform => (

                                            <option
                                                key={
                                                    platform.value
                                                }
                                                value={
                                                    platform.value
                                                }
                                            >
                                                {platform.label}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            <div className="builder-field">

                                <label>
                                    Profile URL
                                </label>

                                <input
                                    type="url"
                                    name="url"
                                    value={
                                        form.url
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://instagram.com/yourusername"
                                    required
                                />

                            </div>


                            <div className="builder-field">

                                <label>
                                    Username
                                    <span>
                                        Optional
                                    </span>
                                </label>

                                <input
                                    name="username"
                                    value={
                                        form.username
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="@yourusername"
                                />

                            </div>


                            <div className="builder-field">

                                <label>
                                    Label
                                    <span>
                                        Optional
                                    </span>
                                </label>

                                <input
                                    name="label"
                                    value={
                                        form.label
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Instagram"
                                />

                            </div>


                            <div className="social-form-actions">

                                <button
                                    type="button"
                                    className="social-cancel"
                                    onClick={
                                        resetForm
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="social-save"
                                    disabled={
                                        saving
                                    }
                                >

                                    <FiCheck />

                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update link"
                                            : "Add link"}

                                </button>

                            </div>

                        </form>

                    )}

                </>

            )}

        </section>
    );
};

export default SocialLinks;