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

            note: {
                type: String,
                default: "",
            },

            createdBy: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
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