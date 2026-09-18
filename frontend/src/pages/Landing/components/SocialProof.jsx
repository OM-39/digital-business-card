import { motion } from "framer-motion";

const SocialProof = () => {

    return (
        <section className="proof-section">

            <div className="container">

                <motion.div
                    className="proof-inner"
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true,
                        amount: 0.4
                    }}
                >

                    <span className="proof-label">
                        BUILT FOR PEOPLE WHO CONNECT
                    </span>

                    <div className="proof-items">

                        <span>
                            Freelancers
                        </span>

                        <span>
                            Founders
                        </span>

                        <span>
                            Creators
                        </span>

                        <span>
                            Sales teams
                        </span>

                        <span>
                            Consultants
                        </span>

                        <span>
                            Professionals
                        </span>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default SocialProof;