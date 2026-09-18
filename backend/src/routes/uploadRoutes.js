const express =
    require("express");

const {
    uploadProfileImage,
    uploadCoverImage
} = require(
    "../controllers/uploadController"
);

const upload =
    require("../middleware/upload");

const {
    protect
} = require(
    "../middleware/authMiddleware"
);

const router =
    express.Router();


router.use(protect);


router.post(
    "/cards/:id/profile-image",
    upload.single("image"),
    uploadProfileImage
);


router.post(
    "/cards/:id/cover-image",
    upload.single("image"),
    uploadCoverImage
);


module.exports = router;