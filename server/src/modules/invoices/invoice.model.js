const mongoose =
    require("mongoose");

const invoiceSchema =
    new mongoose.Schema(
        {
            invoiceNumber: {
                type: String,
                unique: true,
                required: true,
            },

            invoiceType: {
                type: String,
                enum: [
                    "purchase",
                    "sale",
                ],
                required: true,
            },

            sale: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Sale",
            },

            stockIn: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "StockIn",
            },

            pdfUrl: {
                type: String,
                default: null,
            },

            status: {
                type: String,
                enum: [
                    "generated",
                    "sent",
                    "cancelled",
                ],
                default: "generated",
            },

            generatedBy: {
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
        "Invoice",
        invoiceSchema
    );