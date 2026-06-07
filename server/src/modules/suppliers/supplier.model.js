const mongoose = require("mongoose");

const supplierSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            companyName: {
                type: String,
                required: true,
                trim: true,
            },

            email: {
                type: String,
                lowercase: true,
            },

            phone: {
                type: String,
                required: true,
            },

            address: {
                type: String,
            },

            dueAmount: {
                type: Number,
                default: 0,
            },

            totalPurchased: {
                type: Number,
                default: 0,
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
        "Supplier",
        supplierSchema
    );