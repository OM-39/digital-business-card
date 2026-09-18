const express = require("express");

const {
    create,
    getAll,
    getOne,
    update,
    remove,
    publish
} = require("../controllers/cardController");

const {
    create: createSocialLink,
    getAll: getSocialLinks,
    update: updateSocialLink,
    remove: removeSocialLink,
    visibility: toggleSocialLinkVisibility,
    reorder: reorderSocialLinks
} = require("../controllers/socialLinkController");

const {
    createCardValidator
} = require("../validators/cardValidator");

const validate =
    require("../middleware/validate");

const {
    protect
} = require("../middleware/authMiddleware");

const router =
    express.Router();

router.use(protect);

router.post(
    "/",
    createCardValidator,
    validate,
    create
);

router.get("/", getAll); 

router.get("/:id", getOne); 

router.put("/:id", update); 

router.delete("/:id", remove); 

router.patch("/:id/publish", publish); 

router.post("/:cardId/social-links", createSocialLink); 

router.get("/:cardId/social-links", getSocialLinks); 

router.patch("/:cardId/social-links/reorder", reorderSocialLinks);

router.put("/:cardId/social-links/:linkId", updateSocialLink); 

router.delete("/:cardId/social-links/:linkId", removeSocialLink); 

router.patch("/:cardId/social-links/:linkId/visibility", toggleSocialLinkVisibility); 

module.exports = router;