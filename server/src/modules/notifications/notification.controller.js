const notificationService =
    require("./notification.service");

const getNotifications =
    async (
        req,
        res,
        next
    ) => {

        try {

            const page =
                Number(
                    req.query.page
                ) || 1;

            const limit =
                Number(
                    req.query.limit
                ) || 20;

            const result =
                await notificationService
                    .getNotifications(
                        page,
                        limit,
                        req.user._id
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const markAsRead =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await notificationService
                    .markAsRead(
                        req.params.id
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const markAllRead =
    async (
        req,
        res,
        next
    ) => {

        try {

            await notificationService
                .markAllRead(
                    req.user._id
                );

            res.json({
                success: true,
                message:
                    "All notifications marked as read",
            });

        } catch (err) {
            next(err);
        }

    };

const getUnreadCount =
    async (
        req,
        res,
        next
    ) => {

        try {

            const count =
                await notificationService
                    .getUnreadCount(
                        req.user._id
                    );

            res.json({
                success: true,
                count,
            });

        } catch (err) {
            next(err);
        }

    };

const deleteNotification =
    async (
        req,
        res,
        next
    ) => {

        try {

            await notificationService
                .deleteNotification(
                    req.params.id
                );

            res.json({
                success: true,
                message:
                    "Notification deleted",
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    getNotifications,
    markAsRead,
    markAllRead,
    getUnreadCount,
    deleteNotification,
};