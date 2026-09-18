import {
    useState
} from "react";

import {
    FiMenu
} from "react-icons/fi";

import Sidebar
    from "../components/dashboard/Sidebar";

import "./DashboardLayout.css";

const DashboardLayout = ({
    children
}) => {

    const [mobileOpen, setMobileOpen] =
        useState(false);

    return (
        <div className="dashboard-shell">

            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() =>
                    setMobileOpen(false)
                }
            />

            {mobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() =>
                        setMobileOpen(false)
                    }
                />
            )}

            <div className="dashboard-main">

                <header className="dashboard-mobile-header">

                    <button
                        onClick={() =>
                            setMobileOpen(true)
                        }
                        aria-label="Open menu"
                    >
                        <FiMenu />
                    </button>

                    <span className="mobile-brand">
                        Cardly
                    </span>

                </header>

                {children}

            </div>

        </div>
    );
};

export default DashboardLayout;