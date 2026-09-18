import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    trackEvent
} from "../../services/analyticsService";

import {
    FiMail,
    FiPhone,
    FiGlobe,
    FiMapPin,
    FiShare2,
    FiDownload,
    FiExternalLink,
    FiX
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
    QRCodeSVG
} from "qrcode.react";

import {
    getCardTheme
} from "../../utils/cardTheme";

import {
    getPublicCard
} from "../../services/cardService";

import {
    submitLead
} from "../../services/leadService";

import "./PublicCard.css";


const socialIcons = {

    instagram:
        FaInstagram,

    linkedin:
        FaLinkedinIn,

    facebook:
        FaFacebookF,

    twitter:
        FaXTwitter,

    youtube:
        FaYoutube,

    github:
        FaGithub,

    whatsapp:
        FaWhatsapp,

    telegram:
        FaTelegram,

    tiktok:
        FaTiktok

};

const saveContact = (card) => {

    const escapeVCard = (value = "") => {

        return String(value)
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");
    };


    const fullAddress = [
        card.address,
        card.city,
        card.state,
        card.country
    ]
        .filter(Boolean)
        .join(", ");


    const vCard = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        `FN:${escapeVCard(
            card.name
        )}`,

        card.company
            ? `ORG:${escapeVCard(
                card.company
            )}`
            : "",

        card.jobTitle
            ? `TITLE:${escapeVCard(
                card.jobTitle
            )}`
            : "",

        card.phone
            ? `TEL;TYPE=CELL:${escapeVCard(
                card.phone
            )}`
            : "",

        card.email
            ? `EMAIL;TYPE=INTERNET:${escapeVCard(
                card.email
            )}`
            : "",

        card.website
            ? `URL:${escapeVCard(
                card.website
            )}`
            : "",

        fullAddress
            ? `ADR;TYPE=WORK:;;${escapeVCard(
                fullAddress
            )};;;;`
            : "",

        card.profileImage
            ? `PHOTO;VALUE=URI:${card.profileImage}`
            : "",

        "END:VCARD"

    ]
        .filter(Boolean)
        .join("\r\n");


    const blob = new Blob(
        [vCard],
        {
            type:
                "text/vcard;charset=utf-8"
        }
    );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );

    link.href = url;

    link.download =
        `${card.name
            ?.replace(
                /[^a-z0-9]/gi,
                "-"
            )
            .toLowerCase() || "contact"}.vcf`;


    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );
};

const handleShare = async (card) => {

    const shareUrl =
        window.location.href;

    const shareData = {
        title:
            `${card.name} — Digital Card`,

        text:
            card.headline
                ? `${card.name} — ${card.headline}`
                : `Connect with ${card.name}`,

        url:
            shareUrl
    };


    try {

        if (navigator.share) {

            await navigator.share(
                shareData
            );

            setShareMessage(
                "Card shared successfully"
            );

            return;
        }


        await navigator.clipboard.writeText(
            shareUrl
        );

        setShareMessage(
            "Link copied to clipboard"
        );

    } catch (error) {

        if (
            error?.name ===
            "AbortError"
        ) {
            return;
        }


        console.error(
            "Share failed:",
            error
        );


        try {

            await navigator.clipboard.writeText(
                shareUrl
            );

            setShareMessage(
                "Link copied to clipboard"
            );

        } catch {

            setShareMessage(
                "Unable to share card"
            );

        }

    }

};

const getVisitorId = () => {

    const key =
        "digital_card_visitor_id";

    let visitorId =
        localStorage.getItem(key);

    if (!visitorId) {

        visitorId =
            crypto.randomUUID();

        localStorage.setItem(
            key,
            visitorId
        );
    }

    return visitorId;
};


const getSessionId = () => {

    const key =
        "digital_card_session_id";

    let sessionId =
        sessionStorage.getItem(key);

    if (!sessionId) {

        sessionId =
            crypto.randomUUID();

        sessionStorage.setItem(
            key,
            sessionId
        );
    }

    return sessionId;
};

const PublicCard = () => {

    const {
        slug
    } = useParams();


    const [
        card,
        setCard
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");

    const [
        showLeadForm,
        setShowLeadForm
    ] = useState(false);

    const [
        leadForm,
        setLeadForm
    ] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
    });

    const [
        submittingLead,
        setSubmittingLead
    ] = useState(false);

    const [
        leadSubmitted,
        setLeadSubmitted
    ] = useState(false);

    const [
        shareMessage,
        setShareMessage
    ] = useState("");


    const handleDownloadQR = () => {

        const svg =
            document.getElementById(
                "public-card-qr"
            );

        if (!svg) {
            return;
        }

        const serializer =
            new XMLSerializer();

        const source =
            serializer.serializeToString(
                svg
            );

        const blob =
            new Blob(
                [source],
                {
                    type: "image/svg+xml;charset=utf-8"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${card.slug}-qr.svg`;

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(url);
    };

    const handleLeadSubmit = async (
        event
    ) => {

        event.preventDefault();

        try {

            setSubmittingLead(true);

            await submitLead(
                card._id,
                {
                    ...leadForm,
                    source: "card"
                }
            );

            setLeadSubmitted(true);

            setLeadForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                message: ""
            });

            trackEvent({
                cardId: card._id,
                eventType: "lead_submit",
                visitorId: getVisitorId(),
                sessionId: getSessionId()
            });

        } catch (error) {

            console.error(
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to submit your information."
            );

        } finally {

            setSubmittingLead(false);

        }
    };

    useEffect(() => {

        if (!shareMessage) {
            return;
        }

        const timer =
            setTimeout(() => {

                setShareMessage("");

            }, 2500);

        return () => {
            clearTimeout(timer);
        };

    }, [shareMessage]);


    useEffect(() => {

        const loadCard =
            async () => {

                try {

                    setLoading(true);

                    const response =
                        await getPublicCard(
                            slug
                        );

                    setCard(
                        response.card
                    );

                    const visitorId =
                        getVisitorId();

                    const sessionId =
                        getSessionId();

                    trackEvent({
                        cardId:
                            response.card._id,

                        eventType:
                            "page_view",

                        visitorId,

                        sessionId,

                        metadata: {
                            slug:
                                response.card.slug
                        }
                    });

                } catch (error) {

                    console.error(
                        error
                    );

                    setError(
                        error.response
                            ?.data
                            ?.message ||
                        "Card not found"
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadCard();

    }, [slug]);


    if (loading) {

        return (

            <main className="public-card-page">

                <div className="public-card-loading">

                    <div className="loading-spinner" />

                    <span>
                        Loading card...
                    </span>

                </div>

            </main>

        );

    }

    const theme =
        getCardTheme(
            card.theme
        );

    if (error || !card) {

        return (

            <main
                className="public-card-page"
                style={{
                    "--card-bg":
                        theme.background,

                    "--card-surface":
                        theme.surface,

                    "--card-text":
                        theme.text,

                    "--card-muted":
                        theme.muted,

                    "--card-border":
                        theme.border,

                    "--card-primary":
                        theme.primaryColor,

                    "--card-secondary":
                        theme.secondaryColor,

                    "--card-font":
                        theme.fontFamily
                }}
            >

                <div className="public-card-error">

                    <div className="error-mark">
                        ×
                    </div>

                    <h1>
                        Card not found
                    </h1>

                    <p>
                        This card may be unpublished
                        or no longer available.
                    </p>

                </div>

            </main>

        );

    }


    const visibleLinks =
        card.socialLinks
            ?.filter(
                link =>
                    link.isVisible
            ) || [];


    return (

        <main
            className="public-card-page"
            style={{
                "--card-bg":
                    theme.background,

                "--card-surface":
                    theme.surface,

                "--card-text":
                    theme.text,

                "--card-muted":
                    theme.muted,

                "--card-border":
                    theme.border,

                "--card-primary":
                    theme.primaryColor,

                "--card-secondary":
                    theme.secondaryColor,

                "--card-font":
                    theme.fontFamily
            }}
        >

            <article className="public-card">

                {/* Cover */}

                <div
                    className="public-card-cover"
                    style={
                        card.coverImage
                            ? {
                                backgroundImage:
                                    `url(${card.coverImage})`
                            }
                            : undefined
                    }
                />


                {/* Profile */}

                <div className="public-card-content">

                    <div className="public-profile">

                        <div className="public-avatar">

                            {card.profileImage ? (

                                <img
                                    src={
                                        card.profileImage
                                    }
                                    alt={
                                        card.name
                                    }
                                />

                            ) : (

                                <span>
                                    {card.name
                                        ?.charAt(
                                            0
                                        )
                                        .toUpperCase()}
                                </span>

                            )}

                        </div>


                        <h1>
                            {card.name}
                        </h1>


                        {card.headline && (

                            <p className="public-headline">
                                {card.headline}
                            </p>

                        )}

                    </div>


                    {/* Actions */}

                    <div className="public-card-actions">

                        <button
                            type="button"
                            className="primary-card-action"
                            onClick={() => {

                                saveContact(card);

                                trackEvent({
                                    cardId: card._id,
                                    eventType: "vcard_download",
                                    visitorId: getVisitorId(),
                                    sessionId: getSessionId()
                                });

                            }}
                        >
                            Save contact
                        </button>


                        <div className="secondary-card-actions">

                            <button
                                type="button"
                                onClick={() => {

                                    handleShare(card);

                                    trackEvent({
                                        cardId: card._id,
                                        eventType: "share",
                                        visitorId: getVisitorId(),
                                        sessionId: getSessionId()
                                    });

                                }}
                            >
                                <FiShare2 />

                                <span>
                                    Share
                                </span>
                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowLeadForm(true)
                                }
                            >
                                <FiMail />

                                <span>
                                    Get in touch
                                </span>
                            </button>

                        </div>

                    </div>


                    {/* Bio */}

                    {card.bio && (

                        <p className="public-bio">
                            {card.bio}
                        </p>

                    )}


                    {/* Social Links */}

                    {visibleLinks.length > 0 && (

                        <div className="public-social-links">

                            {visibleLinks.map(
                                link => {

                                    const Icon =
                                        socialIcons[
                                        link.platform
                                        ];

                                    if (!Icon) {
                                        return null;
                                    }

                                    return (

                                        <a
                                            key={link._id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="public-social-link"
                                            aria-label={
                                                link.label ||
                                                link.platform
                                            }
                                            onClick={() => {

                                                trackEvent({

                                                    cardId:
                                                        card._id,

                                                    eventType:
                                                        "social_click",

                                                    target:
                                                        link.platform,

                                                    visitorId:
                                                        getVisitorId(),

                                                    sessionId:
                                                        getSessionId(),

                                                    metadata: {
                                                        url:
                                                            link.url
                                                    }

                                                });

                                            }}
                                        >

                                            <Icon />

                                        </a>

                                    );

                                }
                            )}

                        </div>

                    )}


                    {/* Contact */}

                    <div className="public-contact">

                        {card.email && (

                            <a
                                href={`mailto:${card.email}`}
                                className="contact-row"
                                onClick={() => {

                                    trackEvent({

                                        cardId:
                                            card._id,

                                        eventType:
                                            "email_click",

                                        target:
                                            card.email,

                                        visitorId:
                                            getVisitorId(),

                                        sessionId:
                                            getSessionId()

                                    });

                                }}
                            >

                                <span className="contact-icon">
                                    <FiMail />
                                </span>

                                <span>
                                    {card.email}
                                </span>

                                <FiExternalLink />

                            </a>

                        )}


                        {card.phone && (

                            <a
                                href={`tel:${card.phone}`}
                                className="contact-row"
                                onClick={() => {

                                    trackEvent({

                                        cardId:
                                            card._id,

                                        eventType:
                                            "phone_click",

                                        target:
                                            card.phone,

                                        visitorId:
                                            getVisitorId(),

                                        sessionId:
                                            getSessionId()

                                    });

                                }}
                            >

                                <span className="contact-icon">
                                    <FiPhone />
                                </span>

                                <span>
                                    {card.phone}
                                </span>

                                <FiExternalLink />

                            </a>

                        )}


                        {card.website && (

                            <a
                                href={card.website}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-row"
                                onClick={() => {

                                    trackEvent({

                                        cardId:
                                            card._id,

                                        eventType:
                                            "website_click",

                                        target:
                                            card.website,

                                        visitorId:
                                            getVisitorId(),

                                        sessionId:
                                            getSessionId()

                                    });

                                }}
                            >

                                <span className="contact-icon">
                                    <FiGlobe />
                                </span>

                                <span>
                                    {card.website}
                                </span>

                                <FiExternalLink />

                            </a>

                        )}


                        {card.city && (

                            <div className="contact-row">

                                <span className="contact-icon">
                                    <FiMapPin />
                                </span>

                                <span>
                                    {[
                                        card.city,
                                        card.state,
                                        card.country
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                </span>

                            </div>

                        )}

                    </div>


                    {/* Company */}

                    {(card.company ||
                        card.jobTitle) && (

                            <div className="public-company">

                                {card.jobTitle && (
                                    <strong>
                                        {card.jobTitle}
                                    </strong>
                                )}

                                {card.company && (
                                    <span>
                                        {card.company}
                                    </span>
                                )}

                            </div>

                        )}

                    <div className="public-qr-section">

                        <div className="public-qr-heading">

                            <span className="public-qr-kicker">
                                SHARE YOUR CARD
                            </span>

                            <h3>
                                Scan to open
                            </h3>

                            <p>
                                Use your phone camera to
                                instantly open this card.
                            </p>

                        </div>


                        <div className="public-qr-code">

                            <QRCodeSVG
                                id="public-card-qr"
                                value={
                                    `${window.location.origin}/c/${card.slug}`
                                }
                                size={176}
                                bgColor="#ffffff"
                                fgColor="#171714"
                                level="H"
                                includeMargin={true}
                            />

                        </div>


                        <div className="public-qr-actions">

                            <button
                                type="button"
                                onClick={
                                    handleDownloadQR
                                }
                            >
                                Download QR
                            </button>

                        </div>

                    </div>

                    <footer className="public-card-footer">

                        <span>
                            Digital Card
                        </span>

                    </footer>

                </div>

            </article>

            {showLeadForm && (

                <div
                    className="lead-modal-overlay"
                    onClick={() =>
                        setShowLeadForm(false)
                    }
                >

                    <div
                        className="lead-modal"
                        onClick={event =>
                            event.stopPropagation()
                        }
                    >

                        <div className="lead-modal-header">

                            <div>

                                <span>
                                    GET IN TOUCH
                                </span>

                                <h2>
                                    Let's connect
                                </h2>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowLeadForm(false)
                                }
                            >
                                <FiX />
                            </button>

                        </div>


                        {leadSubmitted ? (

                            <div className="lead-success">

                                <div>
                                    ✓
                                </div>

                                <h3>
                                    Thanks for reaching out.
                                </h3>

                                <p>
                                    Your information has
                                    been submitted successfully.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setLeadSubmitted(false);
                                        setShowLeadForm(false);
                                    }}
                                >
                                    Done
                                </button>

                            </div>

                        ) : (

                            <form
                                onSubmit={
                                    handleLeadSubmit
                                }
                                className="lead-form"
                            >

                                <input
                                    type="text"
                                    placeholder="Your name *"
                                    required
                                    value={
                                        leadForm.name
                                    }
                                    onChange={event =>
                                        setLeadForm({
                                            ...leadForm,
                                            name:
                                                event.target.value
                                        })
                                    }
                                />

                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={
                                        leadForm.email
                                    }
                                    onChange={event =>
                                        setLeadForm({
                                            ...leadForm,
                                            email:
                                                event.target.value
                                        })
                                    }
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    value={
                                        leadForm.phone
                                    }
                                    onChange={event =>
                                        setLeadForm({
                                            ...leadForm,
                                            phone:
                                                event.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={
                                        leadForm.company
                                    }
                                    onChange={event =>
                                        setLeadForm({
                                            ...leadForm,
                                            company:
                                                event.target.value
                                        })
                                    }
                                />

                                <textarea
                                    placeholder="Message"
                                    rows="4"
                                    value={
                                        leadForm.message
                                    }
                                    onChange={event =>
                                        setLeadForm({
                                            ...leadForm,
                                            message:
                                                event.target.value
                                        })
                                    }
                                />

                                <p className="lead-form-hint">
                                    Provide an email or phone number
                                    so the card owner can contact you.
                                </p>

                                <button
                                    type="submit"
                                    disabled={
                                        submittingLead
                                    }
                                    className="lead-submit"
                                >
                                    {submittingLead
                                        ? "Sending..."
                                        : "Send message"}
                                </button>

                            </form>

                        )}

                    </div>

                </div>



            )}

            {shareMessage && (

                <div
                    className="share-toast"
                    role="status"
                >

                    <span className="share-toast-check">
                        ✓
                    </span>

                    <span>
                        {shareMessage}
                    </span>

                </div>

            )}

        </main>

    );

};


export default PublicCard;