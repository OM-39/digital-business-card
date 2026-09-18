import {
    FiArrowLeft,
    FiCheck,
    FiGlobe
} from "react-icons/fi";

import {
    Link
} from "react-router-dom";


const BuilderHeader = ({
    mode = "create",
    loading = false,
    saved = false,
    onSave,
    isPublished = false,
    publishing = false,
    onPublish
}) => {

    const isEdit =
        mode === "edit";

    return (
        <header className="builder-header">

            <div className="builder-header-left">

                <Link
                    to="/dashboard"
                    className="builder-back"
                >
                    <FiArrowLeft />

                    <span>
                        Cards
                    </span>
                </Link>

                <div className="builder-divider" />

                <div className="builder-title">

                    <h1>
                        {isEdit
                            ? "Edit your card"
                            : "Create your card"}
                    </h1>

                </div>

            </div>


            <div className="builder-actions">

                {isEdit && saved && (

                    <span className="builder-saved">

                        <FiCheck />

                        Saved just now

                    </span>

                )}


                {/* Publish */}

                {isEdit && (

                    <button
                        type="button"
                        onClick={onPublish}
                        className={
                            isPublished
                                ? "builder-unpublish"
                                : "builder-publish"
                        }
                        disabled={
                            publishing ||
                            loading
                        }
                    >

                        {publishing ? (

                            <>
                                <span className="save-spinner" />

                                {isPublished
                                    ? "Unpublishing..."
                                    : "Publishing..."}
                            </>

                        ) : (

                            <>
                                <FiGlobe />

                                {isPublished
                                    ? "Unpublish"
                                    : "Publish"}
                            </>

                        )}

                    </button>

                )}


                {/* Save */}

                <button
                    type="button"
                    onClick={onSave}
                    className="builder-save"
                    disabled={
                        loading ||
                        publishing
                    }
                >

                    {loading ? (

                        <>
                            <span className="save-spinner" />

                            Saving...
                        </>

                    ) : (

                        <>
                            <FiCheck />

                            {isEdit
                                ? "Save changes"
                                : "Create card"}

                        </>

                    )}

                </button>

            </div>

        </header>
    );
};

export default BuilderHeader;