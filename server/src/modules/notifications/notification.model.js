const mongoose =
    require("mongoose");

const notificationSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },

            type: {
                type: String,
                enum: [
                    "low-stock",
                    "expiry",
                    "supplier-due",
                    "customer-due",
                    "sale",
                    "system",
                ],
                required: true,
            },

            user: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: null,
            },

            isRead: {
                type: Boolean,
                default: false,
            },

            metadata: {
                type:
                    mongoose.Schema.Types.Mixed,
                default: {},
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Notification",
        notificationSchema
    );