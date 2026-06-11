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
    require("./sale.controller");

const {
    createSaleSchema,
} =
    require("./sale.validation");

router.post(
    "/",
    protect,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    validateRequest(
        createSaleSchema
    ),
    controller.createSale
);

router.get(
    "/",
    protect,
    controller.getSales
);

router.get(
    "/customer/:customerId",
    protect,
    controller.getCustomerSales
);

router.get(
    "/:id",
    protect,
    controller.getSaleById
);

module.exports = router;