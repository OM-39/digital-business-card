import {
    motion
} from "framer-motion";

import {
    FiMail,
    FiPhone,
    FiGlobe,
    FiMapPin,
    FiBriefcase
} from "react-icons/fi";


const CardForm = ({
    form,
    onChange,
    profileImage,
    coverImage,
    onProfileImageUpload,
    onCoverImageUpload,
    uploadingProfile,
    uploadingCover,
    isEdit
}) => {

    return (
        <form
            id="card-builder-form"
            onSubmit={event =>
                event.preventDefault()
            }
        >

            {/* PROFILE */}

            <motion.div
                className="builder-section"
                initial={{
                    opacity: 0,
                    y: 15
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
            >

                <div className="builder-section-heading">

                    <span>
                        01
                    </span>

                    <div>

                        <h2>
                            Profile
                        </h2>

                        <p>
                            Tell people who you are.
                        </p>

                    </div>

                </div>

                <div className="form-grid">

                    <div className="image-upload-area">

                        <div className="image-upload-group">

                            <label>
                                Profile photo
                            </label>

                            <div className="profile-upload-row">

                                <div className="profile-upload-preview">

                                    {profileImage ? (

                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                        />

                                    ) : (

                                        form.name
                                            ? form.name
                                                .charAt(0)
                                                .toUpperCase()
                                            : "OP"

                                    )}

                                </div>

                                <div>

                                    <label
                                        htmlFor="profile-image-input"
                                        className="upload-button"
                                    >

                                        {uploadingProfile
                                            ? "Uploading..."
                                            : "Upload photo"}

                                    </label>

                                    <input
                                        id="profile-image-input"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        hidden
                                        disabled={
                                            uploadingProfile ||
                                            !isEdit
                                        }
                                        onChange={event =>
                                            onProfileImageUpload(
                                                event.target.files[0]
                                            )
                                        }
                                    />

                                    <p className="upload-help">
                                        JPG, PNG or WEBP · Max 5MB
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="image-upload-group">

                            <label>
                                Cover image
                            </label>

                            <div
                                className="cover-upload-preview"
                                style={
                                    coverImage
                                        ? {
                                            backgroundImage:
                                                `url(${coverImage})`
                                        }
                                        : undefined
                                }
                            >

                                {!coverImage && (
                                    <span>
                                        No cover image
                                    </span>
                                )}

                                <label
                                    htmlFor="cover-image-input"
                                    className="cover-upload-button"
                                >

                                    {uploadingCover
                                        ? "Uploading..."
                                        : "Upload cover"}

                                </label>

                                <input
                                    id="cover-image-input"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    hidden
                                    disabled={
                                        uploadingCover ||
                                        !isEdit
                                    }
                                    onChange={event =>
                                        onCoverImageUpload(
                                            event.target.files[0]
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    <div className="builder-field full">

                        <label>
                            Name
                        </label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="Om Patel"
                            maxLength={100}
                            required
                        />

                    </div>

                    <div className="builder-field full">

                        <label>
                            Headline
                        </label>

                        <input
                            name="headline"
                            value={form.headline}
                            onChange={onChange}
                            placeholder="Full Stack Developer"
                            maxLength={150}
                        />

                    </div>

                    <div className="builder-field full">

                        <label>
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={onChange}
                            placeholder="Tell people a little about yourself..."
                            rows={5}
                            maxLength={1000}
                        />

                        <span className="field-counter">
                            {form.bio.length}/1000
                        </span>

                    </div>

                </div>

            </motion.div>


            {/* CONTACT */}

            <motion.div
                className="builder-section"
                initial={{
                    opacity: 0,
                    y: 15
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    delay: 0.08
                }}
            >

                <div className="builder-section-heading">

                    <span>
                        02
                    </span>

                    <div>

                        <h2>
                            Contact
                        </h2>

                        <p>
                            Give people a way to reach you.
                        </p>

                    </div>

                </div>

                <div className="form-grid">

                    <div className="builder-field">

                        <label>
                            Email
                        </label>

                        <div className="input-with-icon">

                            <FiMail />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder="you@example.com"
                            />

                        </div>

                    </div>

                    <div className="builder-field">

                        <label>
                            Phone
                        </label>

                        <div className="input-with-icon">

                            <FiPhone />

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={onChange}
                                placeholder="+91 98765 43210"
                            />

                        </div>

                    </div>

                    <div className="builder-field full">

                        <label>
                            Website
                        </label>

                        <div className="input-with-icon">

                            <FiGlobe />

                            <input
                                type="url"
                                name="website"
                                value={form.website}
                                onChange={onChange}
                                placeholder="https://yourwebsite.com"
                            />

                        </div>

                    </div>

                </div>

            </motion.div>


            {/* PROFESSIONAL */}

            <motion.div
                className="builder-section"
                initial={{
                    opacity: 0,
                    y: 15
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    delay: 0.16
                }}
            >

                <div className="builder-section-heading">

                    <span>
                        03
                    </span>

                    <div>

                        <h2>
                            Professional
                        </h2>

                        <p>
                            Add your professional identity.
                        </p>

                    </div>

                </div>

                <div className="form-grid">

                    <div className="builder-field">

                        <label>
                            Company
                        </label>

                        <div className="input-with-icon">

                            <FiBriefcase />

                            <input
                                name="company"
                                value={form.company}
                                onChange={onChange}
                                placeholder="Cardly"
                            />

                        </div>

                    </div>

                    <div className="builder-field">

                        <label>
                            Job title
                        </label>

                        <input
                            name="jobTitle"
                            value={form.jobTitle}
                            onChange={onChange}
                            placeholder="Founder"
                        />

                    </div>

                </div>

            </motion.div>


            {/* LOCATION */}

            <motion.div
                className="builder-section"
                initial={{
                    opacity: 0,
                    y: 15
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    delay: 0.24
                }}
            >

                <div className="builder-section-heading">

                    <span>
                        04
                    </span>

                    <div>

                        <h2>
                            Location
                        </h2>

                        <p>
                            Optional location information.
                        </p>

                    </div>

                </div>

                <div className="form-grid">

                    <div className="builder-field full">

                        <label>
                            Address
                        </label>

                        <div className="input-with-icon">

                            <FiMapPin />

                            <input
                                name="address"
                                value={form.address}
                                onChange={onChange}
                                placeholder="Your business address"
                            />

                        </div>

                    </div>

                    <div className="builder-field">

                        <label>
                            City
                        </label>

                        <input
                            name="city"
                            value={form.city}
                            onChange={onChange}
                            placeholder="Gandhinagar"
                        />

                    </div>

                    <div className="builder-field">

                        <label>
                            State
                        </label>

                        <input
                            name="state"
                            value={form.state}
                            onChange={onChange}
                            placeholder="Gujarat"
                        />

                    </div>

                    <div className="builder-field full">

                        <label>
                            Country
                        </label>

                        <input
                            name="country"
                            value={form.country}
                            onChange={onChange}
                            placeholder="India"
                        />

                    </div>

                </div>

            </motion.div>

        </form>
    );
};

export default CardForm;