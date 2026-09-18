import {
    useEffect,
    useState
} from "react";

import {
    FiEye,
    FiUsers,
    FiMousePointer,
    FiUserPlus,
    FiMail,
    FiPhone,
    FiGlobe,
    FiShare2,
    FiDownload
} from "react-icons/fi";

import toast from "react-hot-toast";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import Header
    from "../../components/dashboard/Header";

import {
    getAnalytics,
    getAnalyticsTimeline,
    getTopInteractions
} from "../../services/analyticsService";

import "./Analytics.css";


const Analytics = () => {

    const [
        analytics,
        setAnalytics
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        days,
        setDays
    ] = useState(0);

    const [
        timeline,
        setTimeline
    ] = useState([]);

    const [
        interactions,
        setInteractions
    ] = useState([]);


    useEffect(() => {

        const loadAnalytics =
            async () => {

                try {

                    setLoading(true);

                    const response =
                        await getAnalytics(
                            days
                        );

                    setAnalytics(
                        response.analytics
                    );

                    const timelineResponse =
                        await getAnalyticsTimeline(
                            days || 30
                        );

                    setTimeline(
                        timelineResponse.timeline
                    );

                    const interactionResponse =
                        await getTopInteractions(
                            days || 30
                        );

                    setInteractions(
                        interactionResponse.interactions
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                    toast.error(
                        "Unable to load analytics"
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadAnalytics();

    }, [days]);
    const data = analytics || {

        views: 0,

        uniqueVisitors: 0,

        clicks: 0,

        leads: 0,

        ctr: 0,

        breakdown: {

            email: 0,

            phone: 0,

            website: 0,

            social: 0

        },

        shares: 0,

        vcardDownloads: 0,

        qrScans: 0

    };

    const AnalyticsChart = ({
        data
    }) => {

        if (!data.length) {

            return (
                <div className="analytics-chart-empty">
                    No activity recorded yet.
                </div>
            );

        }

        const maxValue =
            Math.max(
                ...data.map(
                    item =>
                        Math.max(
                            item.views,
                            item.clicks
                        )
                ),
                1
            );

        return (

            <div className="analytics-chart">

                <div className="chart-y-axis">

                    <span>
                        {maxValue}
                    </span>

                    <span>
                        {Math.round(
                            maxValue / 2
                        )}
                    </span>

                    <span>
                        0
                    </span>

                </div>


                <div className="chart-area">

                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />


                    <div className="chart-bars">

                        {data.map(item => {

                            const viewHeight =
                                (
                                    item.views /
                                    maxValue
                                ) * 100;

                            const clickHeight =
                                (
                                    item.clicks /
                                    maxValue
                                ) * 100;

                            return (

                                <div
                                    className="chart-column"
                                    key={item.date}
                                    title={
                                        `${item.date} — ` +
                                        `${item.views} views, ` +
                                        `${item.clicks} clicks`
                                    }
                                >

                                    <div
                                        className="chart-bar views"
                                        style={{
                                            height:
                                                `${viewHeight}%`
                                        }}
                                    />

                                    <div
                                        className="chart-bar clicks"
                                        style={{
                                            height:
                                                `${clickHeight}%`
                                        }}
                                    />

                                    <span>
                                        {item.date.slice(
                                            5
                                        )}
                                    </span>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </div>

        );

    };

    const TopInteractions = ({
        interactions
    }) => {

        if (!interactions.length) {

            return (
                <div className="analytics-empty">
                    No interactions recorded yet.
                </div>
            );

        }

        const max =
            Math.max(
                ...interactions.map(
                    item => item.count
                ),
                1
            );

        return (

            <div className="top-interactions">

                {interactions.map(
                    (item, index) => {

                        const percentage =
                            (
                                item.count /
                                max
                            ) * 100;

                        return (

                            <div
                                className="interaction-item"
                                key={
                                    `${item.type}-${item.target}-${index}`
                                }
                            >

                                <div className="interaction-top">

                                    <div>

                                        <strong>
                                            {formatInteractionTarget(
                                                item
                                            )}
                                        </strong>

                                        <span>
                                            {formatEventType(
                                                item.type
                                            )}
                                        </span>

                                    </div>

                                    <b>
                                        {item.count}
                                    </b>

                                </div>


                                <div className="interaction-track">

                                    <div
                                        className="interaction-progress"
                                        style={{
                                            width:
                                                `${percentage}%`
                                        }}
                                    />

                                </div>

                            </div>

                        );

                    }
                )}

            </div>

        );

    };

    const formatInteractionTarget = (
        item
    ) => {

        if (
            item.type ===
            "social_click"
        ) {

            return item.target
                ?.charAt(0)
                .toUpperCase() +
                item.target?.slice(1);

        }

        if (
            item.type ===
            "email_click"
        ) {
            return "Email";
        }

        if (
            item.type ===
            "phone_click"
        ) {
            return "Phone";
        }

        if (
            item.type ===
            "website_click"
        ) {
            return "Website";
        }

        return item.target || "Link";
    };


    const formatEventType = (
        type
    ) => {

        switch (type) {

            case "social_click":
                return "Social link";

            case "email_click":
                return "Contact";

            case "phone_click":
                return "Contact";

            case "website_click":
                return "Contact";

            case "link_click":
                return "Link";

            default:
                return "Interaction";

        }

    };

    return (

        <DashboardLayout>

            <div className="analytics-page">

                <Header />


                <main className="analytics-main">

                    <div className="analytics-heading">

                        <div>

                            <span>
                                ANALYTICS
                            </span>

                            <h1>
                                Understand your reach.
                            </h1>

                            <p>
                                See how people interact
                                with your digital identity.
                            </p>

                        </div>


                        <select
                            value={days}
                            onChange={event =>
                                setDays(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                            className="analytics-period"
                        >

                            <option value={0}>
                                All time
                            </option>

                            <option value={7}>
                                Last 7 days
                            </option>

                            <option value={30}>
                                Last 30 days
                            </option>

                            <option value={90}>
                                Last 90 days
                            </option>

                        </select>

                    </div>


                    {loading ? (

                        <div className="analytics-loading">

                            <div className="loading-spinner" />

                            <span>
                                Loading analytics...
                            </span>

                        </div>

                    ) : (

                        <>

                            <section className="analytics-stats">

                                <AnalyticsStat
                                    icon={FiEye}
                                    label="Profile views"
                                    value={data.views}
                                />

                                <AnalyticsStat
                                    icon={FiUsers}
                                    label="Unique visitors"
                                    value={
                                        data.uniqueVisitors
                                    }
                                />

                                <AnalyticsStat
                                    icon={FiMousePointer}
                                    label="Clicks"
                                    value={data.clicks}
                                />

                                <AnalyticsStat
                                    icon={FiUserPlus}
                                    label="Leads"
                                    value={data.leads}
                                />

                            </section>


                            <section className="analytics-grid">

                                <div className="analytics-panel">

                                    <div className="analytics-panel-heading">

                                        <div>

                                            <span>
                                                PERFORMANCE
                                            </span>

                                            <h2>
                                                Top interactions
                                            </h2>

                                        </div>

                                    </div>


                                    <TopInteractions
                                        interactions={
                                            interactions
                                        }
                                    />

                                </div>

                                <div className="analytics-panel">

                                    <div className="analytics-panel-heading">

                                        <div>

                                            <span>
                                                ENGAGEMENT
                                            </span>

                                            <h2>
                                                Interaction breakdown
                                            </h2>

                                        </div>

                                    </div>


                                    <AnalyticsRow
                                        icon={FiMail}
                                        label="Email"
                                        value={
                                            data.breakdown.email
                                        }
                                    />

                                    <AnalyticsRow
                                        icon={FiPhone}
                                        label="Phone"
                                        value={
                                            data.breakdown.phone
                                        }
                                    />

                                    <AnalyticsRow
                                        icon={FiGlobe}
                                        label="Website"
                                        value={
                                            data.breakdown.website
                                        }
                                    />

                                    <AnalyticsRow
                                        icon={FiUsers}
                                        label="Social"
                                        value={
                                            data.breakdown.social
                                        }
                                    />

                                    <AnalyticsRow
                                        icon={FiShare2}
                                        label="Shares"
                                        value={
                                            data.shares
                                        }
                                    />

                                    <AnalyticsRow
                                        icon={FiDownload}
                                        label="Contact downloads"
                                        value={
                                            data.vcardDownloads
                                        }
                                    />

                                </div>


                                <div className="analytics-panel analytics-ctr">

                                    <span>
                                        CONVERSION
                                    </span>

                                    <h2>
                                        Click-through rate
                                    </h2>

                                    <strong>
                                        {data.ctr}%
                                    </strong>

                                    <p>
                                        Percentage of profile
                                        visitors who interacted
                                        with your card.
                                    </p>

                                </div>

                            </section>

                        </>

                    )}

                </main>

            </div>

        </DashboardLayout>

    );

};


const AnalyticsStat = ({
    icon: Icon,
    label,
    value
}) => {

    return (

        <div className="analytics-stat">

            <div className="analytics-stat-top">

                <span>
                    {label}
                </span>

                <div>
                    <Icon size={16} />
                </div>

            </div>

            <strong>
                {value.toLocaleString()}
            </strong>

        </div>

    );

};


const AnalyticsRow = ({
    icon: Icon,
    label,
    value
}) => {

    return (

        <div className="analytics-row">

            <div className="analytics-row-label">

                <div>
                    <Icon size={15} />
                </div>

                <span>
                    {label}
                </span>

            </div>

            <strong>
                {value.toLocaleString()}
            </strong>

        </div>

    );

};


export default Analytics;