const express =
    require("express");

const router =
    express.Router();

const authRoutes =
    require(
        "../modules/auth/auth.route"
    );

const supplierRoutes =
    require(
        "../modules/suppliers/supplier.route"
    );

const categoryRoutes =
    require(
        "../modules/categories/category.route"
    );

const productRoutes =
    require(
        "../modules/products/product.route"
    );

const batchRoutes =
    require(
        "../modules/product-batches/batch.route"
    );

const inventoryTransactionRoutes =
    require(
        "../modules/inventory-transactions/inventoryTransaction.route"
    );

const stockInRoutes =
    require(
        "../modules/stock-ins/stockIn.route"
    );

router.use(
    "/auth",
    authRoutes
);

router.use(
    "/suppliers",
    supplierRoutes
);

router.use(
    "/categories",
    categoryRoutes
);

router.use(
    "/products",
    productRoutes
);

router.use(
    "/batches",
    batchRoutes
);

router.use(
    "/inventory-transactions",
    inventoryTransactionRoutes
);

router.use(
    "/stock-ins",
    stockInRoutes
);

module.exports =
    router;