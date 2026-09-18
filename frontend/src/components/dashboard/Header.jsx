import {
    FiBell,
    FiSearch
} from "react-icons/fi";

import {
    useAuth
} from "../../context/AuthContext";

const Header = () => {

    const { user } = useAuth();

    const initials =
        user?.name
            ?.split(" ")
            .map(
                part =>
                    part[0]
            )
            .join("")
            .slice(0, 2)
            .toUpperCase();

    return (
        <header className="dashboard-header">

            <div>

                <p className="dashboard-kicker">
                    WORKSPACE
                </p>

                <h1>
                    Overview
                </h1>

            </div>

            <div className="dashboard-header-actions">

                <button
                    className="dashboard-icon-button"
                    aria-label="Search"
                >
                    <FiSearch />
                </button>

                <button
                    className="dashboard-icon-button"
                    aria-label="Notifications"
                >
                    <FiBell />
                </button>

                <div className="user-avatar">
                    {initials || "U"}
                </div>

            </div>

        </header>
    );
};

export default Header;