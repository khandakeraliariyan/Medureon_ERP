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
    require("./customer.controller");

const {
    createCustomerSchema,
    updateCustomerSchema,
} =
    require(
        "./customer.validation"
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
        createCustomerSchema
    ),
    controller.createCustomer
);

router.get(
    "/",
    protect,
    controller.getCustomers
);

router.get(
    "/due",
    protect,
    controller.getDueCustomers
);

router.get(
    "/:id",
    protect,
    controller.getCustomerById
);

router.patch(
    "/:id",
    protect,
    validateRequest(
        updateCustomerSchema
    ),
    controller.updateCustomer
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    controller.deleteCustomer
);

module.exports = router;