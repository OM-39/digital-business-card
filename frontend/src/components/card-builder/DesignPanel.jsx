import {
    cardThemes
} from "../../config/cardThemes";

import "./DesignPanel.css";


const fonts = [
    "Inter",
    "DM Sans",
    "Poppins",
    "Montserrat",
    "Playfair Display",
    "Space Grotesk"
];


const DesignPanel = ({
    theme,
    onChange
}) => {

    return (

        <section className="design-panel">

            <div className="design-panel-header">

                <div>
                    <h2>
                        Design
                    </h2>

                    <p>
                        Customize the look of your card.
                    </p>
                </div>

            </div>


            {/* Templates */}

            <div className="design-section">

                <div className="design-section-title">
                    Template
                </div>


                <div className="template-grid">

                    {Object.entries(
                        cardThemes
                    ).map(
                        ([key, template]) => (

                            <button
                                key={key}
                                type="button"
                                className={
                                    `template-option ${
                                        theme.template === key
                                            ? "active"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    onChange(
                                        "template",
                                        key
                                    )
                                }
                            >

                                <div
                                    className={
                                        `template-preview template-${key}`
                                    }
                                >

                                    <div />

                                    <span />
                                    <span />
                                    <span />

                                </div>


                                <strong>
                                    {template.name}
                                </strong>


                                {theme.template === key && (

                                    <span className="template-check">
                                        ✓
                                    </span>

                                )}

                            </button>

                        )
                    )}

                </div>

            </div>


            {/* Colors */}

            <div className="design-section">

                <div className="design-section-title">
                    Colors
                </div>


                <div className="color-controls">

                    <label className="color-control">

                        <span>
                            Primary
                        </span>

                        <div className="color-input">

                            <input
                                type="color"
                                value={
                                    theme.primaryColor
                                }
                                onChange={event =>
                                    onChange(
                                        "primaryColor",
                                        event.target.value
                                    )
                                }
                            />

                            <code>
                                {theme.primaryColor}
                            </code>

                        </div>

                    </label>


                    <label className="color-control">

                        <span>
                            Secondary
                        </span>

                        <div className="color-input">

                            <input
                                type="color"
                                value={
                                    theme.secondaryColor
                                }
                                onChange={event =>
                                    onChange(
                                        "secondaryColor",
                                        event.target.value
                                    )
                                }
                            />

                            <code>
                                {theme.secondaryColor}
                            </code>

                        </div>

                    </label>

                </div>

            </div>


            {/* Font */}

            <div className="design-section">

                <div className="design-section-title">
                    Typography
                </div>


                <label className="design-select-label">

                    <span>
                        Font
                    </span>

                    <select
                        value={
                            theme.fontFamily
                        }
                        onChange={event =>
                            onChange(
                                "fontFamily",
                                event.target.value
                            )
                        }
                    >

                        {fonts.map(font => (

                            <option
                                key={font}
                                value={font}
                            >
                                {font}
                            </option>

                        ))}

                    </select>

                </label>

            </div>


            {/* Buttons */}

            <div className="design-section">

                <div className="design-section-title">
                    Buttons
                </div>


                <div className="button-style-grid">

                    {[
                        "rounded",
                        "square",
                        "pill"
                    ].map(style => (

                        <button
                            key={style}
                            type="button"
                            className={
                                `button-style-option ${
                                    theme.buttonStyle === style
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                onChange(
                                    "buttonStyle",
                                    style
                                )
                            }
                        >

                            <span
                                className={
                                    `button-style-demo ${style}`
                                }
                            />

                            <span>
                                {
                                    style
                                        .charAt(0)
                                        .toUpperCase() +
                                    style.slice(1)
                                }
                            </span>

                        </button>

                    ))}

                </div>

            </div>

        </section>

    );
};


export default DesignPanel;