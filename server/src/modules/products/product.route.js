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
    require("./product.controller");

const {
    createProductSchema,
} =
    require(
        "./product.validation"
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
        createProductSchema
    ),
    controller.createProduct
);

router.get(
    "/",
    protect,
    controller.getProducts
);

router.get(
    "/:id",
    protect,
    controller.getProductById
);

router.patch(
    "/:id",
    protect,
    authorize(
        "admin",
        "manager",
        "inventory"
    ),
    controller.updateProduct
);

router.delete(
    "/:id",
    protect,
    authorize(
        "admin"
    ),
    controller.deleteProduct
);

router.get(
    "/inventory/low-stock",
    protect,
    controller.getLowStockProducts
);

router.get(
    "/inventory/expired",
    protect,
    controller.getExpiredProducts
);

router.get(
    "/inventory/expiring-soon",
    protect,
    controller.getExpiringSoonProducts
);

router.get(
    "/barcode/:barcode",
    protect,
    controller.getProductByBarcode
);

module.exports = router;