const QRCode = require("qrcode");

const generateCardQRCode = async (slug) => {
    const baseUrl = process.env.CLIENT_URL;

    const cardUrl = `${baseUrl}/c/${slug}`;

    const qrCodeDataUrl = await QRCode.toDataURL(cardUrl, {
        width: 500,
        margin: 2,
        errorCorrectionLevel: "H"
    });

    return {
        cardUrl,
        qrCodeDataUrl
    };
};

module.exports = {
    generateCardQRCode
};