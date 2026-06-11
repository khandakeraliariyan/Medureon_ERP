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
        "./inventoryTransaction.controller"
    );

const {
    createTransactionSchema
} =
    require(
        "./inventoryTransaction.validation"
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
        createTransactionSchema
    ),
    controller.createTransaction
);

router.get(
    "/",
    protect,
    controller.getTransactions
);

router.get(
    "/:id",
    protect,
    controller.getTransactionById
);

router.get(
    "/product/:productId",
    protect,
    controller.getProductHistory
);

router.get(
    "/batch/:batchId",
    protect,
    controller.getBatchHistory
);

module.exports = router;