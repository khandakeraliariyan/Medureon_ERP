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

const customerRoutes =
    require(
        "../modules/customers/customer.route"
    );

const saleRoutes =
    require(
        "../modules/sales/sale.route"
    );

const invoiceRoutes =
    require(
        "../modules/invoices/invoice.route"
    );

const lendingRoutes =
    require(
        "../modules/lendings/lending.route"
    );

const analyticsRoutes =
    require(
        "../modules/analytics/analytics.route"
    );

const auditLogRoutes =
    require(
        "../modules/audit-logs/auditLog.route"
    );

const notificationRoutes =
    require(
        "../modules/notifications/notification.route"
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

router.use(
    "/customers",
    customerRoutes
);

router.use(
    "/sales",
    saleRoutes
);

router.use(
    "/invoices",
    invoiceRoutes
);

router.use(
    "/lendings",
    lendingRoutes
);

router.use(
    "/analytics",
    analyticsRoutes
);

router.use(
    "/audit-logs",
    auditLogRoutes
);

router.use(
    "/notifications",
    notificationRoutes
);

module.exports =
    router;