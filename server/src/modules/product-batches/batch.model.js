const mongoose =
    require("mongoose");

const batchSchema =
    new mongoose.Schema(
        {
            product: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Product",
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
                default: 0,
            },

            availableQuantity: {
                type: Number,
                default: 0,
            },

            status: {
                type: String,
                enum: [
                    "active",
                    "expired",
                ],
                default: "active",
            },

            isDeleted: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "ProductBatch",
        batchSchema
    );