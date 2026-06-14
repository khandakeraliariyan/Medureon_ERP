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
        "./report.controller"
    );

router.get(
    "/sales",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getSalesReport
);

router.get(
    "/purchases",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getPurchaseReport
);

router.get(
    "/inventory",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getInventoryReport
);

router.get(
    "/low-stock",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getLowStockReport
);

router.get(
    "/expiry",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getExpiryReport
);

router.get(
    "/customer-dues",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getCustomerDueReport
);

router.get(
    "/supplier-dues",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getSupplierDueReport
);

module.exports =
    router;