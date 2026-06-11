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

module.exports =
    router;