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

const controller =
    require(
        "./auditLog.controller"
    );

router.get(
    "/",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getAuditLogs
);

router.get(
    "/:id",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getAuditLogById
);

router.get(
    "/module/:module",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getModuleHistory
);

router.get(
    "/user/:userId",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getUserActivity
);

module.exports = router;