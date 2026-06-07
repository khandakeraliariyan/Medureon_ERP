const mongoose =
    require("mongoose");

const productSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            genericName: {
                type: String,
                required: true,
            },

            brand: {
                type: String,
            },

            category: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },

            supplier: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Supplier",
                required: true,
            },

            barcode: {
                type: String,
                unique: true,
            },

            sku: {
                type: String,
                unique: true,
            },

            batchNumber: {
                type: String,
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

            stockQuantity: {
                type: Number,
                default: 0,
            },

            reorderLevel: {
                type: Number,
                default: 10,
            },

            unit: {
                type: String,
                default: "pcs",
            },

            status: {
                type: String,
                enum: [
                    "active",
                    "inactive",
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
        "Product",
        productSchema
    );