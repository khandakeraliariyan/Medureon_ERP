const mongoose =
    require("mongoose");

const stockInItemSchema =
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
        },
        {
            _id: false,
        }
    );

const stockInSchema =
    new mongoose.Schema(
        {
            supplier: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Supplier",
                required: true,
            },

            items: [
                stockInItemSchema
            ],

            totalAmount: {
                type: Number,
                required: true,
            },

            paidAmount: {
                type: Number,
                default: 0,
            },

            dueAmount: {
                type: Number,
                default: 0,
            },

            paymentStatus: {
                type: String,
                enum: [
                    "paid",
                    "partial",
                    "due",
                ],
                default: "due",
            },

            purchaseDate: {
                type: Date,
                default: Date.now,
            },

            note: String,

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
        "StockIn",
        stockInSchema
    );