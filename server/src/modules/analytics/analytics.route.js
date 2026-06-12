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
        "./analytics.controller"
    );

router.get(
    "/dashboard",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getDashboardSummary
);

router.get(
    "/monthly-sales",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getMonthlySales
);

router.get(
    "/top-customers",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getTopCustomers
);

router.get(
    "/top-products",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getTopProducts
);

router.get(
    "/revenue-trend",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getRevenueTrend
);

module.exports = router;