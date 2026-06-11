const mongoose =
    require("mongoose");

const StockIn =
    require("./stockIn.model");

const Supplier =
    require("../suppliers/supplier.model");

const Product =
    require("../products/product.model");

const ProductBatch =
    require(
        "../product-batches/batch.model"
    );

const InventoryTransaction =
    require(
        "../inventory-transactions/inventoryTransaction.model"
    );

const createStockIn =
    async (
        payload,
        userId
    ) => {

        const session =
            await mongoose.startSession();

        session.startTransaction();

        try {

            let dueAmount =
                payload.totalAmount -
                payload.paidAmount;

            let paymentStatus =
                "paid";

            if (
                dueAmount > 0 &&
                payload.paidAmount > 0
            ) {
                paymentStatus =
                    "partial";
            }

            if (
                payload.paidAmount === 0
            ) {
                paymentStatus =
                    "due";
            }

            const stockIn =
                await StockIn.create(
                    [{
                        ...payload,
                        dueAmount,
                        paymentStatus,
                        createdBy: userId,
                    }],
                    { session }
                );

            for (
                const item
                of payload.items
            ) {

                const batch =
                    await ProductBatch.create(
                        [{
                            product:
                                item.product,

                            batchNumber:
                                item.batchNumber,

                            expiryDate:
                                item.expiryDate,

                            quantity:
                                item.quantity,

                            availableQuantity:
                                item.quantity,

                            buyingPrice:
                                item.buyingPrice,

                            sellingPrice:
                                item.sellingPrice,
                        }],
                        { session }
                    );

                await Product.findByIdAndUpdate(
                    item.product,
                    {
                        $inc: {
                            totalStock:
                                item.quantity,
                        },
                    },
                    { session }
                );

                await InventoryTransaction.create(
                    [{
                        product:
                            item.product,

                        batch:
                            batch[0]._id,

                        quantity:
                            item.quantity,

                        type:
                            "purchase",

                        createdBy:
                            userId,
                    }],
                    { session }
                );
            }

            await Supplier.findByIdAndUpdate(
                payload.supplier,
                {
                    $inc: {
                        dueAmount:
                            dueAmount,
                    },
                },
                { session }
            );

            await session.commitTransaction();

            return stockIn[0];

        } catch (error) {

            await session.abortTransaction();

            throw error;

        } finally {

            session.endSession();

        }
    };

const getStockIns =
    async (
        page,
        limit
    ) => {

        const data =
            await StockIn.find()
                .populate("supplier")
                .populate(
                    "createdBy",
                    "name role"
                )
                .sort({
                    createdAt: -1
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await StockIn.countDocuments();

        return {
            data,
            total,
            page,
            limit,
        };
    };

const getStockInById =
    async (id) => {

        return await StockIn
            .findById(id)
            .populate("supplier")
            .populate(
                "createdBy",
                "name role"
            );

    };

module.exports = {
    createStockIn,
    getStockIns,
    getStockInById,
};