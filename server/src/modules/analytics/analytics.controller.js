const analyticsService =
    require("./analytics.service");

const getDashboardSummary =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await analyticsService
                    .getDashboardSummary();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getMonthlySales =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await analyticsService
                    .getMonthlySales();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getTopCustomers =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await analyticsService
                    .getTopCustomers();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getTopProducts =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await analyticsService
                    .getTopProducts();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getRevenueTrend =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await analyticsService
                    .getRevenueTrend();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    getDashboardSummary,
    getMonthlySales,
    getTopCustomers,
    getTopProducts,
    getRevenueTrend,
};