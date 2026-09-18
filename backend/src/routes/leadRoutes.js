const express = require("express");

const {
    create,
    getAll,
    getOne,
    updateStatus,
    remove
} = require("../controllers/leadController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// PUBLIC
router.post(
    "/:cardId",
    create
);


// OWNER
router.get(
    "/",
    protect,
    getAll
);

router.get(
    "/:id",
    protect,
    getOne
);

router.patch(
    "/:id/status",
    protect,
    updateStatus
);

router.delete(
    "/:id",
    protect,
    remove
);

module.exports = router;