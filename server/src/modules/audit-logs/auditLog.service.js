const AuditLog =
    require("./auditLog.model");

const createAuditLog =
    async ({
        user,
        action,
        module,
        entityId,
        oldData,
        newData,
        ipAddress,
    }) => {

        return await AuditLog.create({
            user,
            action,
            module,
            entityId,
            oldData,
            newData,
            ipAddress,
        });
    };

const getAuditLogs =
    async (
        page,
        limit
    ) => {

        const logs =
            await AuditLog.find()
                .populate(
                    "user",
                    "name email role"
                )
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await AuditLog.countDocuments();

        return {
            logs,
            total,
            page,
            limit,
        };
    };

const getAuditLogById =
    async (id) => {

        return await AuditLog
            .findById(id)
            .populate(
                "user",
                "name email role"
            );

    };

const getModuleHistory =
    async (
        moduleName
    ) => {

        return await AuditLog.find({
            module:
                moduleName,
        })
            .populate(
                "user",
                "name role"
            )
            .sort({
                createdAt: -1,
            });

    };

const getUserActivity =
    async (
        userId
    ) => {

        return await AuditLog.find({
            user: userId,
        })
            .sort({
                createdAt: -1,
            });

    };

module.exports = {
    createAuditLog,
    getAuditLogs,
    getAuditLogById,
    getModuleHistory,
    getUserActivity,
};