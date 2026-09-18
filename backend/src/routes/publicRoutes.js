const express = require("express");

const {
    publicCard
} = require("../controllers/cardController");

const router = express.Router();

router.get("/cards/:slug", publicCard);

module.exports = router;