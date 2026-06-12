const auditLogService =
    require("./auditLog.service");

const getAuditLogs =
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
                await auditLogService
                    .getAuditLogs(
                        page,
                        limit
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getAuditLogById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await auditLogService
                    .getAuditLogById(
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

const getModuleHistory =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await auditLogService
                    .getModuleHistory(
                        req.params.module
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getUserActivity =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await auditLogService
                    .getUserActivity(
                        req.params.userId
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    getAuditLogs,
    getAuditLogById,
    getModuleHistory,
    getUserActivity,
};