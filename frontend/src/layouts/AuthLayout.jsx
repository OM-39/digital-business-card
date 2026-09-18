import {
    Link
} from "react-router-dom";

import {
    motion
} from "framer-motion";

import "./AuthLayout.css";

const AuthLayout = ({
    children
}) => {

    return (
        <div className="auth-page">

            <div className="auth-brand">

                <Link
                    to="/"
                    className="brand"
                >
                    <span className="brand-mark">
                        C
                    </span>

                    Cardly
                </Link>

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to home
                </Link>

            </div>

            <div className="auth-visual">

                <div className="auth-orb orb-one" />
                <div className="auth-orb orb-two" />

                <motion.div
                    className="auth-visual-content"
                    initial={{
                        opacity: 0,
                        y: 25
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.7
                    }}
                >

                    <span className="auth-quote-mark">
                        “
                    </span>

                    <blockquote>
                        Your introduction
                        should be as memorable
                        as your work.
                    </blockquote>

                    <p>
                        One beautiful profile.
                        Every way to connect.
                    </p>

                </motion.div>

            </div>

            <main className="auth-content">

                {children}

            </main>

        </div>
    );
};

export default AuthLayout;