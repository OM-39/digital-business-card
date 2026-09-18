import {
    FiGrid,
    FiCreditCard,
    FiBarChart2,
    FiUsers,
    FiDollarSign,
    FiSettings,
    FiLogOut,
    FiPlus
} from "react-icons/fi";

import {
    NavLink,
    Link
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Sidebar = ({
    mobileOpen,
    onClose
}) => {

    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    const navItems = [
        {
            label: "Overview",
            path: "/dashboard",
            icon: FiGrid
        },
        {
            label: "My Cards",
            path: "/cards",
            icon: FiCreditCard
        },
        {
            label: "Analytics",
            path: "/analytics",
            icon: FiBarChart2
        },
        {
            label: "Leads",
            path: "/leads",
            icon: FiUsers
        },
        {
            label: "Plans & Billing",
            path: "/pricing",
            icon: FiDollarSign
        }
    ];

    return (
        <aside
            className={`dashboard-sidebar ${mobileOpen
                    ? "sidebar-open"
                    : ""
                }`}
        >

            <div className="sidebar-top">

                <div className="sidebar-brand-row">

                    <Link
                        to="/dashboard"
                        className="brand"
                        onClick={onClose}
                    >
                        <span className="brand-mark">
                            C
                        </span>

                        Cardly
                    </Link>

                    <button
                        className="sidebar-close"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        ×
                    </button>

                </div>

                <Link
                    to="/cards/new"
                    className="sidebar-create"
                    onClick={onClose}
                >
                    <FiPlus />

                    Create card
                </Link>

                <nav className="sidebar-nav">

                    <span className="sidebar-section-label">
                        Workspace
                    </span>

                    {navItems.map(item => {

                        const Icon =
                            item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={
                                    item.path ===
                                    "/dashboard"
                                }
                                onClick={onClose}
                                className={({
                                    isActive
                                }) =>
                                    isActive
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                            >
                                <Icon size={18} />

                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        );

                    })}

                </nav>

            </div>

            <div className="sidebar-bottom">

                <NavLink
                    to="/settings"
                    className="sidebar-link"
                    onClick={onClose}
                >
                    <FiSettings size={18} />

                    <span>
                        Settings
                    </span>
                </NavLink>

                <button
                    className="sidebar-link sidebar-logout"
                    onClick={handleLogout}
                >
                    <FiLogOut size={18} />

                    <span>
                        Log out
                    </span>
                </button>

            </div>

        </aside>
    );
};

export default Sidebar;