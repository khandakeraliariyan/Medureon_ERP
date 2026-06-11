const mongoose =
    require("mongoose");

const customerSchema =
    new mongoose.Schema(
        {
            customerCode: {
                type: String,
                unique: true,
                required: true,
            },

            name: {
                type: String,
                required: true,
                trim: true,
            },

            phone: {
                type: String,
                required: true,
                unique: true,
            },

            email: {
                type: String,
                lowercase: true,
            },

            address: {
                type: String,
                default: "",
            },

            dueBalance: {
                type: Number,
                default: 0,
            },

            creditLimit: {
                type: Number,
                default: 5000,
            },

            loyaltyPoints: {
                type: Number,
                default: 0,
            },

            totalPurchases: {
                type: Number,
                default: 0,
            },

            totalSpent: {
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
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Customer",
        customerSchema
    );