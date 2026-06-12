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
    require("./invoice.controller");

const {
    createInvoiceSchema
} =
    require("./invoice.validation");

router.post(
    "/",
    protect,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    validateRequest(
        createInvoiceSchema
    ),
    controller.createInvoice
);

router.get(
    "/",
    protect,
    controller.getInvoices
);

router.get(
    "/:id",
    protect,
    controller.getInvoiceById
);

module.exports = router;