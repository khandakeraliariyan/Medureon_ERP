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
    require("./supplier.controller");

const {
    createSupplierSchema,
    updateSupplierSchema,
} =
    require(
        "./supplier.validation"
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
        createSupplierSchema
    ),
    controller.createSupplier
);

router.get(
    "/",
    protect,
    controller.getSuppliers
);

router.get(
    "/:id",
    protect,
    controller.getSupplier
);

router.patch(
    "/:id",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    validateRequest(
        updateSupplierSchema
    ),
    controller.updateSupplier
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    controller.deleteSupplier
);

module.exports = router;