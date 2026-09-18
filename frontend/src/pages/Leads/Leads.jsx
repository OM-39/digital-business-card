import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    FiSearch,
    FiTrash2,
    FiMail,
    FiPhone,
    FiBriefcase,
    FiChevronDown
} from "react-icons/fi";

import {
    getLeads,
    updateLeadStatus,
    deleteLead
} from "../../services/leadService";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import "./Leads.css";


const Leads = () => {

    const [
        leads,
        setLeads
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter
    ] = useState("all");

    const [
        selectedLead,
        setSelectedLead
    ] = useState(null);


    const loadLeads = async () => {

        try {

            setLoading(true);

            const response =
                await getLeads();

            setLeads(
                response.leads || []
            );

        } catch (error) {

            console.error(
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadLeads();

    }, []);


    const filteredLeads =
        useMemo(() => {

            return leads.filter(
                lead => {

                    const query =
                        search
                            .toLowerCase()
                            .trim();

                    const matchesSearch =
                        !query ||
                        lead.name
                            ?.toLowerCase()
                            .includes(query) ||
                        lead.email
                            ?.toLowerCase()
                            .includes(query) ||
                        lead.phone
                            ?.toLowerCase()
                            .includes(query) ||
                        lead.company
                            ?.toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter === "all" ||
                        lead.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            leads,
            search,
            statusFilter
        ]);


    const handleStatusChange =
        async (
            leadId,
            status
        ) => {

            try {

                const response =
                    await updateLeadStatus(
                        leadId,
                        status
                    );

                setLeads(
                    current =>
                        current.map(
                            lead =>
                                lead._id ===
                                    leadId

                                    ? response.lead

                                    : lead
                        )
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        };


    const handleDelete =
        async (
            leadId
        ) => {

            const confirmed =
                window.confirm(
                    "Delete this lead?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await deleteLead(
                    leadId
                );

                setLeads(
                    current =>
                        current.filter(
                            lead =>
                                lead._id !==
                                leadId
                        )
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        };


    return (

        <DashboardLayout>

            <main className="leads-page">

                <div className="leads-container">

                    {/* Header */}

                    <div className="leads-header">

                        <div>

                            <span className="leads-kicker">
                                LEADS
                            </span>

                            <h1>
                                Your leads
                            </h1>

                            <p>
                                Manage people who
                                connected through
                                your digital cards.
                            </p>

                        </div>


                        <div className="leads-count">

                            <strong>
                                {leads.length}
                            </strong>

                            <span>
                                Total leads
                            </span>

                        </div>

                    </div>


                    {/* Toolbar */}

                    <div className="leads-toolbar">

                        <div className="leads-search">

                            <FiSearch
                                size={15}
                            />

                            <input
                                type="text"
                                placeholder="Search leads..."
                                value={search}
                                onChange={
                                    event =>
                                        setSearch(
                                            event.target.value
                                        )
                                }
                            />

                        </div>


                        <select
                            value={
                                statusFilter
                            }
                            onChange={
                                event =>
                                    setStatusFilter(
                                        event.target.value
                                    )
                            }
                            className="leads-filter"
                        >

                            <option value="all">
                                All statuses
                            </option>

                            <option value="new">
                                New
                            </option>

                            <option value="contacted">
                                Contacted
                            </option>

                            <option value="qualified">
                                Qualified
                            </option>

                            <option value="converted">
                                Converted
                            </option>

                            <option value="archived">
                                Archived
                            </option>

                        </select>

                    </div>


                    {/* Content */}

                    {loading ? (

                        <div className="leads-empty">

                            <div className="loading-spinner" />

                            <span>
                                Loading leads...
                            </span>

                        </div>

                    ) : filteredLeads.length === 0 ? (

                        <div className="leads-empty">

                            <div className="leads-empty-icon">
                                <FiMail />
                            </div>

                            <h2>
                                No leads found
                            </h2>

                            <p>
                                {leads.length === 0
                                    ? "When someone submits your contact form, they'll appear here."
                                    : "Try changing your search or filter."}
                            </p>

                        </div>

                    ) : (

                        <div className="leads-list">

                            {filteredLeads.map(
                                lead => (

                                    <div
                                        className="lead-row"
                                        key={
                                            lead._id
                                        }
                                    >

                                        <div className="lead-person">

                                            <div className="lead-avatar">

                                                {lead.name
                                                    ?.charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}

                                            </div>


                                            <div>

                                                <strong>
                                                    {lead.name}
                                                </strong>

                                                {lead.company && (

                                                    <span>
                                                        {lead.company}
                                                    </span>

                                                )}

                                            </div>



                                        </div>




                                        <div className="lead-contact">

                                            {lead.email && (

                                                <a
                                                    href={
                                                        `mailto:${lead.email}`
                                                    }
                                                >
                                                    <FiMail />
                                                    {lead.email}
                                                </a>

                                            )}

                                            {lead.phone && (

                                                <a
                                                    href={
                                                        `tel:${lead.phone}`
                                                    }
                                                >
                                                    <FiPhone />
                                                    {lead.phone}
                                                </a>

                                            )}

                                        </div>


                                        <div className="lead-source">

                                            <span>
                                                {lead.cardId
                                                    ?.name ||
                                                    "Card"}
                                            </span>

                                        </div>

                                        <button
                                            type="button"
                                            className="lead-message-button"
                                            onClick={() =>
                                                setSelectedLead(lead)
                                            }
                                        >
                                            {lead.message
                                                ? "View message"
                                                : "No message"}
                                        </button>


                                        <div className="lead-status">

                                            <select
                                                value={
                                                    lead.status
                                                }
                                                onChange={
                                                    event =>
                                                        handleStatusChange(
                                                            lead._id,
                                                            event.target.value
                                                        )
                                                }
                                            >

                                                <option value="new">
                                                    New
                                                </option>

                                                <option value="contacted">
                                                    Contacted
                                                </option>

                                                <option value="qualified">
                                                    Qualified
                                                </option>

                                                <option value="converted">
                                                    Converted
                                                </option>

                                                <option value="archived">
                                                    Archived
                                                </option>

                                            </select>

                                        </div>


                                        <div className="lead-date">

                                            {new Date(
                                                lead.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )}

                                        </div>


                                        <button
                                            type="button"
                                            className="lead-delete"
                                            onClick={() =>
                                                handleDelete(
                                                    lead._id
                                                )
                                            }
                                            aria-label="Delete lead"
                                        >
                                            <FiTrash2
                                                size={14}
                                            />
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

                {selectedLead && (

                    <div
                        className="lead-modal-overlay"
                        onClick={() =>
                            setSelectedLead(null)
                        }
                    >

                        <div
                            className="lead-message-modal"
                            onClick={event =>
                                event.stopPropagation()
                            }
                        >

                            <div className="lead-message-header">

                                <div>

                                    <span>
                                        MESSAGE
                                    </span>

                                    <h2>
                                        {selectedLead.name}
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedLead(null)
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            {selectedLead.message ? (

                                <div className="lead-message-content">
                                    {selectedLead.message}
                                </div>

                            ) : (

                                <div className="lead-no-message">
                                    This lead didn't leave a message.
                                </div>

                            )}


                            <div className="lead-message-meta">

                                {selectedLead.email && (
                                    <a
                                        href={
                                            `mailto:${selectedLead.email}`
                                        }
                                    >
                                        {selectedLead.email}
                                    </a>
                                )}

                                {selectedLead.phone && (
                                    <a
                                        href={
                                            `tel:${selectedLead.phone}`
                                        }
                                    >
                                        {selectedLead.phone}
                                    </a>
                                )}

                            </div>

                        </div>

                    </div>
                )}
            </main>

        </DashboardLayout>

    );

};


export default Leads;