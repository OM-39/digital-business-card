import {
    useEffect,
    useState
} from "react";

import {
    FiCheck,
    FiZap,
    FiStar
} from "react-icons/fi";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import {
    getPlans
} from "../../services/planService";

import "./Pricing.css";


const Pricing = () => {

    const [plans, setPlans] =
        useState([]);

    const [
        subscription,
        setSubscription
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");

    const [billing, setBilling] =
        useState("year");


    useEffect(() => {

        const loadPlans =
            async () => {

                try {

                    setLoading(true);

                    const response =
                        await getPlans();

                    setPlans(
                        response.plans || []
                    );

                    setSubscription(
                        response.subscription
                    );

                } catch (error) {

                    console.error(error);

                    setError(
                        error.response
                            ?.data
                            ?.message ||
                        "Failed to load plans"
                    );

                } finally {

                    setLoading(false);

                }

            };

        loadPlans();

    }, []);


    const currentPlanId =
        subscription?.planId?._id;


    const formatPrice = (
        price,
        currency
    ) => {

        if (price === 0) {
            return "Free";
        }

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency:
                    currency || "INR",
                maximumFractionDigits: 0
            }
        ).format(price);

    };


    const getFeatureList = (
        features
    ) => {

        if (!features) {
            return [];
        }

        if (Array.isArray(features)) {
            return features;
        }

        return Object.entries(
            features
        ).map(
            ([key, value]) => {

                if (
                    typeof value ===
                    "boolean"
                ) {
                    return value
                        ? key
                        : null;
                }

                return `${key}: ${value}`;
            }
        ).filter(Boolean);

    };

    const visiblePlans = plans.filter(
        (plan) => {

            if (plan.slug === "free") {
                return true;
            }

            return (
                plan.billingInterval ===
                billing
            );
        }
    );


    if (loading) {

        return (

            <DashboardLayout>

                <main className="pricing-page">

                    <div className="pricing-loading">

                        <div className="pricing-spinner" />

                        <span>
                            Loading plans...
                        </span>

                    </div>

                </main>

            </DashboardLayout>

        );

    }


    if (error) {

        return (

            <DashboardLayout>

                <main className="pricing-page">

                    <div className="pricing-error">

                        {error}

                    </div>

                </main>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <main className="pricing-page">

                <div className="pricing-container">

                    <header className="pricing-header">

                        <span className="pricing-kicker">
                            PLANS & BILLING
                        </span>

                        <h1>
                            Choose the right plan
                        </h1>

                        <p>
                            Start free and upgrade
                            when your business grows.
                        </p>

                    </header>

                    <div className="pricing-toggle">

                        <button
                            type="button"
                            className={
                                billing === "month"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setBilling("month")
                            }
                        >
                            Monthly
                        </button>

                        <button
                            type="button"
                            className={
                                billing === "year"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setBilling("year")
                            }
                        >
                            Yearly

                            <span>
                                Save 16%
                            </span>

                        </button>

                    </div>

                    <div className="pricing-grid">

                        {visiblePlans.map(
                            (plan) => {

                                const isCurrent =
                                    currentPlanId ===
                                    plan._id;

                                const isPopular =
                                    plan.isPopular === true;


                                const features =
                                    getFeatureList(
                                        plan.features
                                    );


                                return (

                                    <article
                                        key={
                                            plan._id
                                        }
                                        className={
                                            `pricing-card ${isPopular
                                                ? "popular"
                                                : ""
                                            } ${isCurrent
                                                ? "current"
                                                : ""
                                            }`
                                        }
                                    >

                                        {isPopular && (

                                            <div className="pricing-popular">
                                                <FiStar />
                                                Most popular
                                            </div>

                                        )}


                                        <div className="pricing-card-top">

                                            <div className="pricing-icon">

                                                {isPopular ? (
                                                    <FiZap />
                                                ) : (
                                                    <FiStar />
                                                )}

                                            </div>

                                            <h2>
                                                {plan.name}
                                            </h2>

                                            <p>
                                                {
                                                    plan.description
                                                }
                                            </p>

                                        </div>


                                        <div className="pricing-price">

                                            <strong>
                                                {
                                                    formatPrice(
                                                        plan.price,
                                                        plan.currency
                                                    )
                                                }
                                            </strong>

                                            {plan.price >
                                                0 &&
                                                plan.billingInterval !==
                                                "one_time" && (

                                                    <span>
                                                        /{
                                                            plan.billingInterval
                                                        }
                                                    </span>

                                                )}

                                        </div>


                                        <div className="pricing-divider" />


                                        <ul className="pricing-features">

                                            {features.map(
                                                (
                                                    feature,
                                                    index
                                                ) => (

                                                    <li
                                                        key={
                                                            index
                                                        }
                                                    >

                                                        <span>
                                                            <FiCheck />
                                                        </span>

                                                        {feature}

                                                    </li>

                                                )
                                            )}

                                        </ul>


                                        <button
                                            type="button"
                                            className={
                                                isCurrent
                                                    ? "pricing-button current-button"
                                                    : "pricing-button"
                                            }
                                            disabled={
                                                isCurrent
                                            }
                                        >

                                            {isCurrent
                                                ? "Current plan"
                                                : plan.price ===
                                                    0
                                                    ? "Get started"
                                                    : "Upgrade"}

                                        </button>

                                    </article>

                                );

                            }
                        )}

                    </div>

                </div>

            </main>

        </DashboardLayout>

    );

};


export default Pricing;