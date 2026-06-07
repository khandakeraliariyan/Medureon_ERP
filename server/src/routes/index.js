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

router.use(
    "/auth",
    authRoutes
);

router.use(
    "/suppliers",
    supplierRoutes
);

module.exports =
    router;