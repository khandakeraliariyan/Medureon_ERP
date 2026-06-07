const mongoose =
    require("mongoose");

const productBatchSchema =
    new mongoose.Schema(
        {
            product: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            supplier: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Supplier",
                required: true,
            },

            batchNumber: {
                type: String,
                required: true,
            },

            expiryDate: {
                type: Date,
                required: true,
            },

            buyingPrice: {
                type: Number,
                required: true,
            },

            sellingPrice: {
                type: Number,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },

            remainingQuantity: {
                type: Number,
                required: true,
            },

            status: {
                type: String,
                enum: [
                    "active",
                    "expired",
                    "sold_out",
                ],
                default: "active",
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "ProductBatch",
        productBatchSchema
    );