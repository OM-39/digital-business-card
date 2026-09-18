const {
    createLead,
    getOwnerLeads,
    getOwnerLead,
    updateLeadStatus,
    deleteLead
} = require("../services/leadService");

const create = async (req, res) => {
    try {
        const lead = await createLead(
            req.params.cardId,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Thank you! Your information has been submitted.",
            leadId: lead._id
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const leads = await getOwnerLeads(
            req.user._id
        );

        return res.status(200).json({
            success: true,
            count: leads.length,
            leads
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch leads"
        });
    }
};

const getOne = async (req, res) => {
    try {
        const lead = await getOwnerLead(
            req.user._id,
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            success: true,
            lead
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid lead ID"
        });
    }
};

const updateStatus = async (
    req,
    res
) => {
    try {
        const allowedStatuses = [
            "new",
            "contacted",
            "qualified",
            "converted",
            "archived"
        ];

        const { status } = req.body;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lead status"
            });
        }

        const lead = await updateLeadStatus(
            req.user._id,
            req.params.id,
            status
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lead status updated",
            lead
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const lead = await deleteLead(
            req.user._id,
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lead deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    updateStatus,
    remove
};