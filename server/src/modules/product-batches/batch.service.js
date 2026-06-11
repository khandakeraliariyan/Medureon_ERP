const ProductBatch =
    require("./batch.model");

const createBatch =
    async (payload) => {

        payload.availableQuantity =
            payload.quantity;

        return await ProductBatch.create(
            payload
        );
    };

const getBatches =
    async () => {

        return await ProductBatch
            .find({
                isDeleted: false,
            })
            .populate("product");

    };

const getBatchById =
    async (id) => {

        return await ProductBatch
            .findById(id)
            .populate("product");

    };

const updateBatch =
    async (
        id,
        payload
    ) => {

        return await ProductBatch.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    };

const deleteBatch =
    async (id) => {

        return await ProductBatch.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );

    };

const getExpiredBatches =
    async () => {

        return await ProductBatch.find({
            expiryDate: {
                $lt: new Date(),
            },
            isDeleted: false,
        });

    };

module.exports = {
    createBatch,
    getBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
    getExpiredBatches,
};