import {
    FiArrowUpRight
} from "react-icons/fi";

const StatCard = ({
    label,
    value,
    description,
    icon: Icon
}) => {

    return (
        <div className="stat-card">

            <div className="stat-top">

                <span className="stat-label">
                    {label}
                </span>

                <div className="stat-icon">
                    <Icon size={17} />
                </div>

            </div>

            <strong>
                {value}
            </strong>

            <div className="stat-bottom">

                <span>
                    {description}
                </span>

                <FiArrowUpRight
                    size={14}
                />

            </div>

        </div>
    );
};

export default StatCard;