const mongoose =
    require("mongoose");

const saleItemSchema =
    new mongoose.Schema(
        {
            sale: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Sale",
                required: true,
            },

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
                required: true,
            },

            quantity: {
                type: Number,
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

            totalPrice: {
                type: Number,
                required: true,
            },

            profit: {
                type: Number,
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "SaleItem",
        saleItemSchema
    );