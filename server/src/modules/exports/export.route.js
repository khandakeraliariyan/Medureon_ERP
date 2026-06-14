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

const controller =
    require(
        "./export.controller"
    );

router.get(
    "/sales-excel",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.salesExcel
);

router.get(
    "/inventory-excel",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.inventoryExcel
);

router.get(
    "/customer-due-excel",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.customerDueExcel
);

module.exports =
    router;