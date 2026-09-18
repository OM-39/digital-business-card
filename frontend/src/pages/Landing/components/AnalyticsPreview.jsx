import {
    motion
} from "framer-motion";

import {
    FiTrendingUp,
    FiUsers,
    FiEye,
    FiMousePointer
} from "react-icons/fi";

const AnalyticsPreview = () => {

    return (
        <section
            id="analytics"
            className="section analytics-section"
        >

            <div className="container analytics-grid">

                <motion.div
                    className="analytics-copy"
                    initial={{
                        opacity: 0,
                        x: -30
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0
                    }}
                    viewport={{
                        once: true
                    }}
                >

                    <span className="section-label">
                        ✦ Know your impact
                    </span>

                    <h2 className="section-title">
                        Your connections,
                        <br />
                        with context.
                    </h2>

                    <p className="section-description">
                        See how people discover
                        your card, what they click,
                        and which connections
                        turn into real opportunities.
                    </p>

                </motion.div>

                <motion.div
                    className="analytics-window"
                    initial={{
                        opacity: 0,
                        scale: 0.96
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}
                    viewport={{
                        once: true
                    }}
                >

                    <div className="analytics-top">

                        <div>
                            <span>
                                Overview
                            </span>

                            <h3>
                                Last 30 days
                            </h3>
                        </div>

                        <FiTrendingUp size={20} />

                    </div>

                    <div className="analytics-stats">

                        <div>
                            <FiEye />
                            <strong>
                                1,248
                            </strong>
                            <span>
                                Views
                            </span>
                        </div>

                        <div>
                            <FiUsers />
                            <strong>
                                843
                            </strong>
                            <span>
                                Visitors
                            </span>
                        </div>

                        <div>
                            <FiMousePointer />
                            <strong>
                                426
                            </strong>
                            <span>
                                Clicks
                            </span>
                        </div>

                    </div>

                    <div className="chart">

                        <div className="chart-grid">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>

                        <svg
                            viewBox="0 0 600 180"
                            preserveAspectRatio="none"
                        >

                            <path
                                d="
                                M0 145
                                C50 125 70 140 105 115
                                C140 90 160 120 200 105
                                C245 88 255 100 300 75
                                C340 55 355 80 390 65
                                C430 45 455 70 490 48
                                C530 25 550 50 600 15
                                "
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />

                        </svg>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default AnalyticsPreview;