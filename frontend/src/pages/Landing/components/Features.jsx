import {
    motion
} from "framer-motion";

import {
    QrCode,
    BarChart3,
    Users,
    Share2,
    Palette,
    Smartphone
} from "lucide-react";

const features = [
    {
        icon: Smartphone,
        number: "01",
        title: "One profile. Everything.",
        description:
            "Bring your contact details, social profiles, work and identity together in one beautiful place."
    },

    {
        icon: QrCode,
        number: "02",
        title: "Share in seconds.",
        description:
            "Share your card with a link, QR code or a simple tap. No paper. No typing."
    },

    {
        icon: BarChart3,
        number: "03",
        title: "Know what happens next.",
        description:
            "See views, clicks, scans and engagement so you know how people interact with your card."
    },

    {
        icon: Users,
        number: "04",
        title: "Turn visits into leads.",
        description:
            "Give visitors an easy way to connect with you and capture valuable leads directly from your card."
    },

    {
        icon: Palette,
        number: "05",
        title: "Make it yours.",
        description:
            "Customize your card's visual identity so it feels like you—not another generic template."
    },

    {
        icon: Share2,
        number: "06",
        title: "Built to be shared.",
        description:
            "Your digital identity is always ready to share across meetings, events, social profiles and email."
    }
];

const Features = () => {

    return (
        <section
            id="features"
            className="section features-section"
        >

            <div className="container">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true,
                        amount: 0.25
                    }}
                >

                    <span className="section-label">
                        ✦ Everything in one place
                    </span>

                    <h2 className="section-title">
                        More than a
                        <br />
                        digital business card.
                    </h2>

                    <p className="section-description">
                        Your card becomes a living
                        digital identity—designed to
                        connect, engage and grow with you.
                    </p>

                </motion.div>

                <div className="features-grid">

                    {features.map(
                        (
                            feature,
                            index
                        ) => {

                            const Icon =
                                feature.icon;

                            return (
                                <motion.article
                                    key={
                                        feature.number
                                    }
                                    className="feature-card"
                                    initial={{
                                        opacity: 0,
                                        y: 30
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.15
                                    }}
                                    transition={{
                                        delay:
                                            index * 0.07,
                                        duration: 0.5
                                    }}
                                    whileHover={{
                                        y: -5
                                    }}
                                >

                                    <div className="feature-top">

                                        <span>
                                            {
                                                feature.number
                                            }
                                        </span>

                                        <div className="feature-icon">
                                            <Icon
                                                size={19}
                                            />
                                        </div>

                                    </div>

                                    <h3>
                                        {
                                            feature.title
                                        }
                                    </h3>

                                    <p>
                                        {
                                            feature.description
                                        }
                                    </p>

                                </motion.article>
                            );
                        }
                    )}

                </div>

            </div>

        </section>
    );
};

export default Features;