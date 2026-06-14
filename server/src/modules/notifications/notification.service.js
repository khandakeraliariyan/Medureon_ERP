const Notification =
    require("./notification.model");

const createNotification =
    async ({
        title,
        message,
        type,
        user = null,
        metadata = {},
    }) => {

        return await Notification.create({
            title,
            message,
            type,
            user,
            metadata,
        });
    };

const getNotifications =
    async (
        page,
        limit,
        userId
    ) => {

        const query = {};

        if (userId) {
            query.user = userId;
        }

        const notifications =
            await Notification.find(query)
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Notification.countDocuments(
                query
            );

        return {
            notifications,
            total,
            page,
            limit,
        };
    };

const markAsRead =
    async (id) => {

        return await Notification.findByIdAndUpdate(
            id,
            {
                isRead: true,
            },
            {
                new: true,
            }
        );
    };

const markAllRead =
    async (userId) => {

        return await Notification.updateMany(
            {
                user: userId,
                isRead: false,
            },
            {
                $set: {
                    isRead: true,
                },
            }
        );
    };

const deleteNotification =
    async (id) => {

        return await Notification.findByIdAndDelete(
            id
        );
    };

const getUnreadCount =
    async (userId) => {

        return await Notification.countDocuments(
            {
                user: userId,
                isRead: false,
            }
        );
    };

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
    getUnreadCount,
};