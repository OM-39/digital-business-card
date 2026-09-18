import {
    FiMail,
    FiPhone,
    FiGlobe,
    FiMapPin,
    FiUser
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
    getCardTheme
} from "../../utils/cardTheme";

const socialIcons = {
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    facebook: FaFacebookF,
    twitter: FaXTwitter,
    youtube: FaYoutube,
    github: FaGithub,
    whatsapp: FaWhatsapp,
    telegram: FaTelegram,
    tiktok: FaTiktok
};


const CardPreview = ({
    form,
    profileImage,
    coverImage,
    socialLinks = [],
    theme
}) => {

    const cardTheme =
        getCardTheme(theme);

    return (
        <section className="builder-preview">

            <div className="preview-sticky">

                <div className="preview-top">

                    <span>
                        LIVE PREVIEW
                    </span>

                    <div className="preview-status">

                        <span />

                        Draft

                    </div>

                </div>


                <div className="phone-frame">

                    <div
                        className={
                            `phone-screen preview-theme-${cardTheme.template}`
                        }
                        style={{
                            "--preview-primary":
                                cardTheme.primaryColor,

                            "--preview-secondary":
                                cardTheme.secondaryColor,

                            "--preview-text":
                                cardTheme.text,

                            "--preview-muted":
                                cardTheme.muted,

                            "--preview-border":
                                cardTheme.border,

                            "--preview-surface":
                                cardTheme.surface,

                            "--preview-font":
                                cardTheme.fontFamily
                        }}
                    >

                        <div
                            className="preview-cover"
                            style={
                                coverImage
                                    ? {
                                        backgroundImage:
                                            `url(${coverImage})`
                                    }
                                    : undefined
                            }
                        />


                        <div className="preview-content">

                            <div className="preview-avatar">

                                {profileImage ? (

                                    <img
                                        src={profileImage}
                                        alt={form.name || "Profile"}
                                    />

                                ) : form.name ? (

                                    form.name
                                        .charAt(0)
                                        .toUpperCase()

                                ) : (

                                    <FiUser />

                                )}

                            </div>


                            <h2>
                                {form.name ||
                                    "Your Name"}
                            </h2>


                            <p className="preview-headline">

                                {form.headline ||
                                    "Your professional headline"}

                            </p>


                            {(form.company ||
                                form.jobTitle) && (

                                    <p className="preview-work">

                                        {form.jobTitle}

                                        {form.jobTitle &&
                                            form.company &&
                                            " · "}

                                        {form.company}

                                    </p>

                                )}


                            {form.bio && (

                                <p className="preview-bio">
                                    {form.bio}
                                </p>

                            )}


                            <div className="preview-links">

                                {form.email && (

                                    <div>
                                        <FiMail />
                                        <span>
                                            Email
                                        </span>
                                    </div>

                                )}

                                {form.phone && (

                                    <div>
                                        <FiPhone />
                                        <span>
                                            Call
                                        </span>
                                    </div>

                                )}

                                {form.website && (

                                    <div>
                                        <FiGlobe />
                                        <span>
                                            Website
                                        </span>
                                    </div>

                                )}

                                {(form.city ||
                                    form.country) && (

                                        <div>

                                            <FiMapPin />

                                            <span>
                                                {[
                                                    form.city,
                                                    form.country
                                                ]
                                                    .filter(
                                                        Boolean
                                                    )
                                                    .join(
                                                        ", "
                                                    )}
                                            </span>

                                        </div>

                                    )}

                            </div>

                            {socialLinks.some(
                                link => link.isVisible
                            ) && (

                                    <div className="preview-social-links">

                                        {socialLinks
                                            .filter(
                                                link => link.isVisible
                                            )
                                            .map(link => {

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
                                                        className="preview-social-icon"
                                                        title={
                                                            link.label ||
                                                            link.platform
                                                        }
                                                    >

                                                        <Icon />

                                                    </a>

                                                );

                                            })}

                                    </div>

                                )}


                            <button
                                type="button"
                                className={
                                    `preview-contact-button preview-button-${cardTheme.buttonStyle}`
                                }
                            >
                                Save contact
                            </button>

                        </div>

                    </div>

                </div>


                <p className="preview-hint">
                    Changes appear here instantly.
                </p>

            </div>

        </section>
    );
};

export default CardPreview;