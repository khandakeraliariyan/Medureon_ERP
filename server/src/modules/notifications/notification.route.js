const express =
    require("express");

const router =
    express.Router();

const protect =
    require(
        "../../middleware/authMiddleware"
    );

const controller =
    require(
        "./notification.controller"
    );

router.get(
    "/",
    protect,
    controller.getNotifications
);

router.get(
    "/unread-count",
    protect,
    controller.getUnreadCount
);

router.patch(
    "/:id/read",
    protect,
    controller.markAsRead
);

router.patch(
    "/read-all",
    protect,
    controller.markAllRead
);

router.delete(
    "/:id",
    protect,
    controller.deleteNotification
);

module.exports = router;