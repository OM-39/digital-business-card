import {motion} from "framer-motion";
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <motion.nav
            className="landing-nav"
            initial={{
                y: -20,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                duration: 0.6
            }}
        >

            <div className="nav-inner">

                <Link
                    to="/"
                    className="brand"
                >
                    <span className="brand-mark">
                        C
                    </span>

                    <span>
                        Cardly
                    </span>
                </Link>

                <div className="nav-links">

                    <a href="#features">
                        Features
                    </a>

                    <a href="#how-it-works">
                        How it works
                    </a>

                    <a href="#analytics">
                        Analytics
                    </a>

                    <a href="#pricing">
                        Pricing
                    </a>

                </div>

                <div className="nav-actions">

                    <Link
                        to="/login"
                        className="nav-login"
                    >
                        Log in
                    </Link>

                    <Link
                        to="/register"
                        className="nav-cta"
                    >
                        Create your card
                    </Link>

                </div>

            </div>

        </motion.nav>
    );
};

export default Navbar;