import { motion } from "framer-motion";
import {
    FiArrowUpRight
} from "react-icons/fi";
import { Link } from "react-router-dom";

const FinalCTA = () => {
    return (
        <section className="final-cta-section">

            <div className="container">

                <motion.div
                    className="final-cta"
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
                        amount: 0.3
                    }}
                >

                    <div className="cta-glow" />

                    <div className="cta-content">

                        <span className="cta-label">
                            ✦ Your next introduction
                        </span>

                        <h2>
                            Make every
                            <br />
                            introduction count.
                        </h2>

                        <p>
                            Create your digital identity
                            today and share it with anyone,
                            anywhere.
                        </p>

                        <Link
                            to="/register"
                            className="cta-button"
                        >
                            Create your card

                            <FiArrowUpRight
                                size={18}
                            />
                        </Link>

                        <span className="cta-note">
                            Free to get started ·
                            No credit card required
                        </span>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default FinalCTA;