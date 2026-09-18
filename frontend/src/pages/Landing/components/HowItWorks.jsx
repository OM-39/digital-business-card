import {
    motion
} from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Create",
        description:
            "Add your details, social links and professional identity."
    },

    {
        number: "02",
        title: "Customize",
        description:
            "Choose your layout, colors and style until it feels like you."
    },

    {
        number: "03",
        title: "Share",
        description:
            "Send your card through a link, QR code or wherever you connect."
    },

    {
        number: "04",
        title: "Connect",
        description:
            "Let people save your contact details and reach out instantly."
    }
];

const HowItWorks = () => {

    return (
        <section
            id="how-it-works"
            className="section how-section"
        >

            <div className="container">

                <div className="how-header">

                    <motion.div
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
                            ✦ Simple by design
                        </span>

                        <h2 className="section-title">
                            From hello
                            <br />
                            to connection.
                        </h2>

                    </motion.div>

                    <p className="section-description">
                        No complicated setup.
                        Create your identity once
                        and share it everywhere.
                    </p>

                </div>

                <div className="steps">

                    {steps.map(
                        (
                            step,
                            index
                        ) => (

                            <motion.div
                                key={
                                    step.number
                                }
                                className="step"
                                initial={{
                                    opacity: 0,
                                    y: 25
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.4
                                }}
                                transition={{
                                    delay:
                                        index * 0.12
                                }}
                            >

                                <div className="step-number">
                                    {
                                        step.number
                                    }
                                </div>

                                <div className="step-line" />

                                <h3>
                                    {
                                        step.title
                                    }
                                </h3>

                                <p>
                                    {
                                        step.description
                                    }
                                </p>

                            </motion.div>

                        )
                    )}

                </div>

            </div>

        </section>
    );
};

export default HowItWorks;