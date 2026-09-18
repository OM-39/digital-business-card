import {
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaXTwitter
} from "react-icons/fa6";

import {
    Link
} from "react-router-dom";

const Footer = () => {

    return (
        <footer className="landing-footer">

            <div className="container">

                <div className="footer-main">

                    <div className="footer-brand">

                        <Link
                            to="/"
                            className="brand footer-logo"
                        >
                            <span className="brand-mark">
                                C
                            </span>

                            <span>
                                Cardly
                            </span>
                        </Link>

                        <p>
                            Your identity,
                            one tap away.
                        </p>

                        <div className="footer-socials">

                            <a
                                href="#"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="#"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="#"
                                aria-label="X"
                            >
                                <FaXTwitter />
                            </a>

                        </div>

                    </div>

                    <div className="footer-column">

                        <h4>
                            Product
                        </h4>

                        <a href="#features">
                            Features
                        </a>

                        <a href="#analytics">
                            Analytics
                        </a>

                        <a href="#pricing">
                            Pricing
                        </a>

                        <a href="#how-it-works">
                            How it works
                        </a>

                    </div>

                    <div className="footer-column">

                        <h4>
                            Company
                        </h4>

                        <a href="#">
                            About
                        </a>

                        <a href="#">
                            Contact
                        </a>

                        <a href="#">
                            Careers
                        </a>

                        <a href="#">
                            Blog
                        </a>

                    </div>

                    <div className="footer-column">

                        <h4>
                            Legal
                        </h4>

                        <a href="#">
                            Privacy
                        </a>

                        <a href="#">
                            Terms
                        </a>

                        <a href="#">
                            Cookies
                        </a>

                    </div>

                </div>

                <div className="footer-bottom">

                    <span>
                        © 2026 Cardly.
                        All rights reserved.
                    </span>

                    <span>
                        Built for better connections.
                    </span>

                </div>

            </div>

        </footer>
    );
};

export default Footer;