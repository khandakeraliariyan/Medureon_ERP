const InventoryTransaction =
    require(
        "./inventoryTransaction.model"
    );

const Product =
    require(
        "../products/product.model"
    );

const ProductBatch =
    require(
        "../product-batches/batch.model"
    );

const createTransaction =
    async (
        payload,
        userId
    ) => {

        const transaction =
            await InventoryTransaction.create({
                ...payload,
                createdBy: userId,
            });

        return transaction;
    };

const getTransactions =
    async (
        page,
        limit
    ) => {

        const transactions =
            await InventoryTransaction
                .find()
                .populate("product")
                .populate("batch")
                .populate(
                    "createdBy",
                    "name email role"
                )
                .sort({
                    createdAt: -1
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await InventoryTransaction
                .countDocuments();

        return {
            transactions,
            total,
            page,
            limit,
        };
    };

const getTransactionById =
    async (id) => {

        return await InventoryTransaction
            .findById(id)
            .populate("product")
            .populate("batch")
            .populate(
                "createdBy",
                "name email role"
            );

    };

const getProductHistory =
    async (
        productId
    ) => {

        return await InventoryTransaction
            .find({
                product: productId,
            })
            .populate("batch")
            .populate(
                "createdBy",
                "name role"
            )
            .sort({
                createdAt: -1,
            });

    };

const getBatchHistory =
    async (
        batchId
    ) => {

        return await InventoryTransaction
            .find({
                batch: batchId,
            })
            .populate("product")
            .populate(
                "createdBy",
                "name role"
            )
            .sort({
                createdAt: -1,
            });

    };

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    getProductHistory,
    getBatchHistory,
};