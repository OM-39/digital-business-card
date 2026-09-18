const Lead = require("../models/Lead");
const Card = require("../models/Card");
const {
    checkLeadLimit
} = require("./planLimitService");

const createLead = async (cardId, data) => {
    const card = await Card.findOne({
        _id: cardId,
        isPublished: true,
        isActive: true
    });

    if (!card) {
        throw new Error("Card not found");
    }

    const leadLimit =
        await checkLeadLimit(
            card.userId
        );

    if (!leadLimit.allowed) {
        throw new Error(
            "This card has reached its monthly lead limit. Please upgrade your plan."
        );
    }

    if (!data.email && !data.phone) {
        throw new Error(
            "Email or phone number is required"
        );
    }

    const lead = await Lead.create({
        cardId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        source: data.source || "card"
    });

    return lead;
};

const getOwnerLeads = async (userId) => {
    const cards = await Card.find({
        userId
    }).select("_id");

    const cardIds = cards.map(card => card._id);

    return Lead.find({
        cardId: {
            $in: cardIds
        }
    })
        .populate(
            "cardId",
            "name slug"
        )
        .sort({
            createdAt: -1
        });
};

const getOwnerLead = async (
    userId,
    leadId
) => {
    const lead = await Lead.findById(leadId)
        .populate(
            "cardId",
            "name slug userId"
        );

    if (!lead) {
        return null;
    }

    if (
        lead.cardId.userId.toString() !==
        userId.toString()
    ) {
        return null;
    }

    return lead;
};

const updateLeadStatus = async (
    userId,
    leadId,
    status
) => {
    const lead = await getOwnerLead(
        userId,
        leadId
    );

    if (!lead) {
        return null;
    }

    lead.status = status;

    await lead.save();

    return lead;
};

const deleteLead = async (
    userId,
    leadId
) => {
    const lead = await getOwnerLead(
        userId,
        leadId
    );

    if (!lead) {
        return null;
    }

    await Lead.deleteOne({
        _id: leadId
    });

    return lead;
};

module.exports = {
    createLead,
    getOwnerLeads,
    getOwnerLead,
    updateLeadStatus,
    deleteLead
};