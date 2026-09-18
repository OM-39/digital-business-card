const Card = require("../models/Card");
const {
    generateCardQRCode
} = require("../services/qrService");

const generateQR = async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.cardId,
            userId: req.user._id
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        const result = await generateCardQRCode(
            card.slug
        );

        return res.status(200).json({
            success: true,
            cardUrl: result.cardUrl,
            qrCode: result.qrCodeDataUrl
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate QR code"
        });
    }
};

module.exports = {
    generateQR
};