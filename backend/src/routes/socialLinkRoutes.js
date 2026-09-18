const express = require("express");

const {
    create,
    getAll,
    update,
    remove,
    visibility,
    reorder
} = require(
    "../controllers/socialLinkController"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);

const router =
    express.Router();

router.use(protect);

router.post(
    "/:cardId/social-links",
    create
);

router.get(
    "/:cardId/social-links",
    getAll
);

router.patch(
    "/:cardId/social-links/reorder",
    reorder
);

router.put(
    "/:cardId/social-links/:linkId",
    update
);

router.delete(
    "/:cardId/social-links/:linkId",
    remove
);

router.patch(
    "/:cardId/social-links/:linkId/visibility",
    visibility
);


module.exports = router;