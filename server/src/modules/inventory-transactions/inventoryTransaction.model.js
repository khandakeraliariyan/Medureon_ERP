const mongoose =
    require("mongoose");

const inventoryTransactionSchema =
    new mongoose.Schema(
        {
            product: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            batch: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "ProductBatch",
            },

            type: {
                type: String,
                enum: [
                    "purchase",
                    "sale",
                    "return",
                    "adjustment",
                    "damage",
                ],
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },

            note: String,

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