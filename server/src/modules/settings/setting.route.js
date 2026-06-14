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

const validateRequest =
    require(
        "../../middleware/validateRequest"
    );

const controller =
    require(
        "./setting.controller"
    );

const {
    updateSettingSchema,
} =
    require(
        "./setting.validation"
    );

router.get(
    "/",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getSettings
);

router.patch(
    "/",
    protect,
    authorize(
        "admin"
    ),
    validateRequest(
        updateSettingSchema
    ),
    controller.updateSettings
);

module.exports = router;