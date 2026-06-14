const express =
    require("express");

const router =
    express.Router();

const protect =
    require(
        "../../middleware/authMiddleware"
    );

const authorize =
    require(
        "../../middleware/roleMiddleware"
    );

const upload =
    require(
        "../../middleware/upload.middleware"
    );

const controller =
    require(
        "./upload.controller"
    );

router.post(
    "/single",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    upload.single(
        "file"
    ),
    controller.uploadFile
);

router.delete(
    "/:publicId",
    protect,
    authorize(
        "admin"
    ),
    controller.deleteFile
);

module.exports =
    router;