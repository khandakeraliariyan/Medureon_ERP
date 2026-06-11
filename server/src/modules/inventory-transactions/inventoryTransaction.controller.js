const inventoryService =
    require(
        "./inventoryTransaction.service"
    );

const createTransaction =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await inventoryService
                    .createTransaction(
                        req.body,
                        req.user._id
                    );

            res.status(201).json({
                success: true,
                message:
                    "Transaction created",
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getTransactions =
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
                await inventoryService
                    .getTransactions(
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

const getTransactionById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await inventoryService
                    .getTransactionById(
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

const getProductHistory =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await inventoryService
                    .getProductHistory(
                        req.params.productId
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getBatchHistory =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await inventoryService
                    .getBatchHistory(
                        req.params.batchId
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
    createTransaction,
    getTransactions,
    getTransactionById,
    getProductHistory,
    getBatchHistory,
};