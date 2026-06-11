const stockInService =
    require("./stockIn.service");

const createStockIn =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await stockInService
                    .createStockIn(
                        req.body,
                        req.user._id
                    );

            res.status(201).json({
                success: true,
                message:
                    "Stock In created",
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getStockIns =
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
                ) || 10;

            const result =
                await stockInService
                    .getStockIns(
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

const getStockInById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await stockInService
                    .getStockInById(
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

module.exports = {
    createStockIn,
    getStockIns,
    getStockInById,
};