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
        "./lending.controller"
    );

const {
    createLendingSchema,
    payInstallmentSchema,
} =
    require(
        "./lending.validation"
    );

router.post(
    "/",
    protect,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    validateRequest(
        createLendingSchema
    ),
    controller.createLending
);

router.post(
    "/:id/pay",
    protect,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    validateRequest(
        payInstallmentSchema
    ),
    controller.payInstallment
);

router.get(
    "/",
    protect,
    controller.getLendings
);

router.get(
    "/:id",
    protect,
    controller.getLendingById
);

module.exports = router;