import {
    motion
} from "framer-motion";

import {
    ArrowUpRight,
    Check
} from "lucide-react";

import { FaLinkedin,FaInstagram } from 'react-icons/fa';

import {
    FiArrowUpRight,
    FiCheck,
    FiEye,
    FiUsers
} from "react-icons/fi";


import {
    Link
} from "react-router-dom";

const BrandIcon = ({
    icon,
    size = 18
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d={icon.path} />
        </svg>
    );
};

const Hero = () => {

    return (
        <section className="hero">

            <div className="hero-glow" />

            <div className="container hero-grid">

                <div className="hero-copy">

                    <motion.div
                        className="section-label"
                        initial={{
                            opacity: 0,
                            y: 15
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        <span>
                            ✦
                        </span>

                        The smarter business card
                    </motion.div>

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 25
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.1,
                            duration: 0.7
                        }}
                    >
                        Your identity,
                        <br />

                        <span>
                            one tap away.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6
                        }}
                    >
                        Create a beautiful digital
                        business card that makes
                        sharing your identity,
                        connecting with people,
                        and growing your network effortless.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{
                            opacity: 0,
                            y: 15
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.3,
                            duration: 0.6
                        }}
                    >

                        <Link
                            to="/register"
                            className="primary-button"
                        >
                            Create your card

                            <FiArrowUpRight
                                size={17}
                            />

                        </Link>

                        <a
                            href="#how-it-works"
                            className="secondary-button"
                        >
                            See how it works
                        </a>

                    </motion.div>

                    <div className="hero-trust">

                        <div className="trust-avatars">
                            <span>O</span>
                            <span>R</span>
                            <span>S</span>
                            <span>+</span>
                        </div>

                        <div>
                            <div className="trust-stars">
                                ★★★★★
                            </div>

                            <p>
                                Built for modern professionals
                            </p>
                        </div>

                    </div>

                </div>

                <motion.div
                    className="hero-visual"
                    initial={{
                        opacity: 0,
                        scale: 0.92
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        delay: 0.25,
                        duration: 0.8
                    }}
                >

                    <motion.div
                        className="floating-badge badge-one"
                        animate={{
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <FiCheck size={15} />
                        Contact saved
                    </motion.div>

                    <motion.div
                        className="floating-badge badge-two"
                        animate={{
                            y: [0, 8, 0]
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        128 profile views
                    </motion.div>

                    <div className="hero-card">

                        <div className="card-cover" />

                        <div className="hero-card-body">

                            <div className="hero-avatar">
                                OP
                            </div>

                            <h2>
                                Om Patel
                            </h2>

                            <p className="card-role">
                                Full Stack Developer
                            </p>

                            <p className="card-company">
                                Building digital experiences
                            </p>

                            <div className="card-divider" />

                            <div className="hero-card-links">

                                <div>
                                    <span>
                                        <FaLinkedin size={17} />
                                    </span>
                                    
                                    LinkedIn
                                </div>

                                <div>
                                    <span>
                                        <FaInstagram size={17} />
                                    </span>

                                    Instagram
                                </div>

                            </div>

                            <button className="save-contact">
                                Save contact
                            </button>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default Hero;