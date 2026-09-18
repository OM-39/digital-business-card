import { motion } from "framer-motion";
import {
    FiCheck,
    FiArrowUpRight
} from "react-icons/fi";
import { Link } from "react-router-dom";

const plans = [
    {
        name: "Free",
        description:
            "Everything you need to get started.",
        price: "₹0",
        period: "/month",

        features: [
            "1 digital card",
            "Up to 10 social links",
            "Basic analytics",
            "25 leads/month",
            "QR code sharing"
        ],

        button: "Get started",
        featured: false
    },

    {
        name: "Pro",
        description:
            "For professionals who want more.",
        price: "₹499",
        period: "/month",

        features: [
            "Up to 5 digital cards",
            "Up to 20 social links/card",
            "Advanced analytics",
            "1,000 leads/month",
            "Custom domain",
            "Remove Cardly branding",
            "Priority sharing tools"
        ],

        button: "Start with Pro",
        featured: true
    },

    {
        name: "Business",
        description:
            "For teams and growing businesses.",
        price: "₹1,499",
        period: "/month",

        features: [
            "Unlimited digital cards",
            "Unlimited social links",
            "Advanced analytics",
            "Unlimited leads",
            "Custom domain",
            "Remove Cardly branding",
            "Priority support"
        ],

        button: "Choose Business",
        featured: false
    }
];

const Pricing = () => {

    return (
        <section
            id="pricing"
            className="section pricing-section"
        >

            <div className="container">

                <motion.div
                    className="pricing-heading"
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
                        amount: 0.3
                    }}
                >

                    <span className="section-label">
                        ✦ Simple pricing
                    </span>

                    <h2 className="section-title">
                        Start free.
                        <br />
                        Upgrade when ready.
                    </h2>

                    <p className="section-description">
                        Start building your digital
                        identity without a credit card.
                        Upgrade when you need more.
                    </p>

                </motion.div>

                <div className="pricing-grid">

                    {plans.map(
                        (
                            plan,
                            index
                        ) => (

                            <motion.article
                                key={plan.name}
                                className={`pricing-card ${
                                    plan.featured
                                        ? "pricing-featured"
                                        : ""
                                }`}
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
                                        index * 0.1
                                }}
                                whileHover={{
                                    y: -6
                                }}
                            >

                                {plan.featured && (
                                    <div className="popular-badge">
                                        Most popular
                                    </div>
                                )}

                                <div className="pricing-top">

                                    <h3>
                                        {plan.name}
                                    </h3>

                                    <p>
                                        {
                                            plan.description
                                        }
                                    </p>

                                </div>

                                <div className="price">

                                    <strong>
                                        {plan.price}
                                    </strong>

                                    <span>
                                        {plan.period}
                                    </span>

                                </div>

                                <Link
                                    to="/register"
                                    className={
                                        plan.featured
                                            ? "pricing-button pricing-button-primary"
                                            : "pricing-button"
                                    }
                                >
                                    {plan.button}

                                    <FiArrowUpRight
                                        size={16}
                                    />

                                </Link>

                                <div className="pricing-divider" />

                                <p className="included">
                                    Includes:
                                </p>

                                <ul className="pricing-features">

                                    {plan.features.map(
                                        feature => (

                                            <li
                                                key={
                                                    feature
                                                }
                                            >

                                                <span>
                                                    <FiCheck
                                                        size={14}
                                                    />
                                                </span>

                                                {feature}

                                            </li>

                                        )
                                    )}

                                </ul>

                            </motion.article>

                        )
                    )}

                </div>

                <p className="pricing-note">
                    All plans are billed monthly.
                    You can change or cancel your
                    plan anytime.
                </p>

            </div>

        </section>
    );
};

export default Pricing;