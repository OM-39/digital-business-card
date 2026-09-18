import {
    useEffect,
    useState
} from "react";

import {
    FiEye,
    FiMousePointer,
    FiUsers,
    FiPlus
} from "react-icons/fi";

import {
    Link
} from "react-router-dom";

import {
    motion
} from "framer-motion";

import toast from "react-hot-toast";

import {
    getDashboard
} from "../../services/dashboardService";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import Header
    from "../../components/dashboard/Header";

import StatCard
    from "../../components/dashboard/StatCard";

import "./Dashboard.css";

const Dashboard = () => {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const response =
                    await getDashboard();

                setDashboard(
                    response.dashboard
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    "Unable to load dashboard"
                );

            } finally {

                setLoading(false);
            }
        };

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <DashboardLayout>

                <div className="dashboard-loading">

                    <div className="loading-spinner" />

                    <p>
                        Loading your workspace...
                    </p>

                </div>

            </DashboardLayout>
        );
    }

    const stats =
        dashboard?.stats || {};

    const cards =
        dashboard?.cards || [];

    const subscription =
        dashboard?.subscription;

    return (
        <DashboardLayout>

            <div className="dashboard-page">

                <Header />

                <main>

                    <motion.div
                        className="welcome-row"
                        initial={{
                            opacity: 0,
                            y: 15
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >

                        <div>

                            <h2>
                                Your network at a glance.
                            </h2>

                            <p>
                                Here's what's happening
                                across your digital identity.
                            </p>

                        </div>

                        <Link
                            to="/cards/new"
                            className="dashboard-create-button"
                        >
                            <FiPlus />

                            Create card
                        </Link>

                    </motion.div>

                    <div className="stats-grid">

                        <StatCard
                            label="Profile views"
                            value={
                                stats.views || 0
                            }
                            description="All time"
                            icon={FiEye}
                        />

                        <StatCard
                            label="Clicks"
                            value={
                                stats.clicks || 0
                            }
                            description="All time"
                            icon={FiMousePointer}
                        />

                        <StatCard
                            label="Leads"
                            value={
                                stats.leads || 0
                            }
                            description="Captured"
                            icon={FiUsers}
                        />

                    </div>

                    <section className="dashboard-section">

                        <div className="section-heading-row">

                            <div>

                                <span>
                                    YOUR CARDS
                                </span>

                                <h2>
                                    Digital identities
                                </h2>

                            </div>

                            <Link
                                to="/cards"
                                className="view-all"
                            >
                                View all →
                            </Link>

                        </div>

                        {cards.length === 0 ? (

                            <div className="dashboard-empty">

                                <div className="empty-icon">
                                    <FiPlus />
                                </div>

                                <h3>
                                    Create your first card
                                </h3>

                                <p>
                                    Build your digital identity
                                    and start sharing it.
                                </p>

                                <Link
                                    to="/cards/new"
                                    className="empty-button"
                                >
                                    Create digital card
                                </Link>

                            </div>

                        ) : (

                            <div className="card-list">

                                {cards.map(card => (

                                    <div
                                        key={card._id}
                                        className="dashboard-card-row"
                                    >

                                        <div className="mini-card-preview">
                                            <span>
                                                {card.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </span>
                                        </div>


                                        <div className="card-row-info">

                                            <h3>
                                                {card.name}
                                            </h3>

                                            <p>
                                                {card.headline ||
                                                    "Digital business card"}
                                            </p>

                                        </div>


                                        <div className="card-row-right">

                                            <div className="card-status">

                                                <span
                                                    className={
                                                        card.isPublished
                                                            ? "status-dot published"
                                                            : "status-dot"
                                                    }
                                                />

                                                {card.isPublished
                                                    ? "Published"
                                                    : "Draft"}

                                            </div>


                                            <div className="card-row-actions">

                                                <Link
                                                    to={`/cards/${card._id}/edit`}
                                                    className="card-action-edit"
                                                >
                                                    Edit
                                                </Link>


                                                {card.isPublished && (

                                                    <Link
                                                        to={`/c/${card.slug}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="card-action-view"
                                                    >
                                                        View
                                                    </Link>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>

                    <section className="dashboard-bottom-grid">

                        <div className="recent-leads-panel">

                            <div className="section-heading-row">

                                <div>

                                    <span>
                                        RECENT ACTIVITY
                                    </span>

                                    <h2>
                                        Recent leads
                                    </h2>

                                </div>

                                <Link
                                    to="/leads"
                                    className="view-all"
                                >
                                    View all →
                                </Link>

                            </div>

                            {dashboard?.recentLeads?.length ? (

                                <div className="lead-list">

                                    {dashboard.recentLeads.map(
                                        lead => (

                                            <div
                                                className="lead-row"
                                                key={lead._id}
                                            >

                                                <div className="lead-avatar">
                                                    {lead.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {lead.name}
                                                    </strong>

                                                    <span>
                                                        {lead.email ||
                                                            lead.phone ||
                                                            "New connection"}
                                                    </span>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="no-leads">
                                    No leads yet.
                                </div>

                            )}

                        </div>

                        <div className="plan-panel">

                            <span>
                                CURRENT PLAN
                            </span>

                            <h2>
                                {subscription?.planId?.name ||
                                    "Free"}
                            </h2>

                            <p>
                                {subscription?.planId
                                    ?.description ||
                                    "Get started with your digital identity."}
                            </p>

                            <Link
                                to="/billing"
                                className="plan-button"
                            >
                                Manage plan →
                            </Link>

                        </div>

                    </section>

                </main>

            </div>

        </DashboardLayout>
    );
};

export default Dashboard;