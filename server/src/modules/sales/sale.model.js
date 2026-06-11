const mongoose =
    require("mongoose");

const saleSchema =
    new mongoose.Schema(
        {
            invoiceNumber: {
                type: String,
                required: true,
                unique: true,
            },

            customer: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Customer",
            },

            subtotal: {
                type: Number,
                required: true,
            },

            discount: {
                type: Number,
                default: 0,
            },

            tax: {
                type: Number,
                default: 0,
            },

            total: {
                type: Number,
                required: true,
            },

            paidAmount: {
                type: Number,
                required: true,
            },

            dueAmount: {
                type: Number,
                default: 0,
            },

            profit: {
                type: Number,
                default: 0,
            },

            paymentMethod: {
                type: String,
                enum: [
                    "cash",
                    "card",
                    "mobile-banking",
                ],
                default: "cash",
            },

            paymentStatus: {
                type: String,
                enum: [
                    "paid",
                    "partial",
                    "due",
                ],
                default: "paid",
            },

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
        "Sale",
        saleSchema
    );