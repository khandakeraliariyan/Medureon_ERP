const express =
    require("express");

const router =
    express.Router();

const protect =
    require("../../middleware/authMiddleware");

const authorize =
    require("../../middleware/roleMiddleware");

const validateRequest =
    require("../../middleware/validateRequest");

const controller =
    require("./stockIn.controller");

const {
    createStockInSchema
} =
    require(
        "./stockIn.validation"
    );

router.post(
    "/",
    protect,
    authorize(
        "admin",
        "manager",
        "inventory"
    ),
    validateRequest(
        createStockInSchema
    ),
    controller.createStockIn
);

router.get(
    "/",
    protect,
    controller.getStockIns
);

router.get(
    "/:id",
    protect,
    controller.getStockInById
);

module.exports = router;