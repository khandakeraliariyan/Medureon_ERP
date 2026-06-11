const batchService =
    require("./batch.service");

const createBatch =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await batchService
                    .createBatch(
                        req.body
                    );

            res.status(201).json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getBatches =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await batchService
                    .getBatches();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getBatchById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await batchService
                    .getBatchById(
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

const updateBatch =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await batchService
                    .updateBatch(
                        req.params.id,
                        req.body
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const deleteBatch =
    async (
        req,
        res,
        next
    ) => {

        try {

            await batchService
                .deleteBatch(
                    req.params.id
                );

            res.json({
                success: true,
                message:
                    "Batch deleted",
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    createBatch,
    getBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
};