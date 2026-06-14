const mongoose =
    require("mongoose");

const settingSchema =
    new mongoose.Schema(
        {
            pharmacyName: {
                type: String,
                required: true,
                default: "My Pharmacy",
            },

            pharmacyAddress: {
                type: String,
                default: "",
            },

            pharmacyPhone: {
                type: String,
                default: "",
            },

            pharmacyEmail: {
                type: String,
                default: "",
            },

            invoicePrefix: {
                type: String,
                default: "INV",
            },

            purchasePrefix: {
                type: String,
                default: "PUR",
            },

            currency: {
                type: String,
                default: "BDT",
            },

            taxPercentage: {
                type: Number,
                default: 0,
            },

            lowStockThreshold: {
                type: Number,
                default: 10,
            },

            allowNegativeStock: {
                type: Boolean,
                default: false,
            },

            enableCustomerCredit: {
                type: Boolean,
                default: true,
            },

            enableNotifications: {
                type: Boolean,
                default: true,
            },

            logoUrl: {
                type: String,
                default: "",
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Setting",
        settingSchema
    );