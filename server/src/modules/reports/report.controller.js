const reportService =
    require("./report.service");

const getSalesReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                startDate,
                endDate,
            } = req.query;

            const result =
                await reportService
                    .getSalesReport(
                        startDate,
                        endDate
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getPurchaseReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await reportService
                    .getPurchaseReport(
                        req.query.startDate,
                        req.query.endDate
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getInventoryReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await reportService
                    .getInventoryReport();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getLowStockReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await reportService
                    .getLowStockReport();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getExpiryReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await reportService
                    .getExpiryReport();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getCustomerDueReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await reportService
                    .getCustomerDueReport();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getSupplierDueReport =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await reportService
                    .getSupplierDueReport();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    getSalesReport,
    getPurchaseReport,
    getInventoryReport,
    getLowStockReport,
    getExpiryReport,
    getCustomerDueReport,
    getSupplierDueReport,
};