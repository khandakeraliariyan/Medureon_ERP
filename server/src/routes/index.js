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

module.exports =
    router;