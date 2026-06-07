const mongoose =
    require("mongoose");

const inventoryTransactionSchema =
    new mongoose.Schema(
        {
            product: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },

            batch: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "ProductBatch",
            },

            transactionType: {
                type: String,
                enum: [
                    "purchase",
                    "sale",
                    "return",
                    "adjustment",
                ],
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },

            previousStock: {
                type: Number,
                required: true,
            },

            currentStock: {
                type: Number,
                required: true,
            },

            referenceId: {
                type:
                    mongoose.Schema.Types.ObjectId,
            },

            notes: String,

            createdBy: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "InventoryTransaction",
        inventoryTransactionSchema
    );