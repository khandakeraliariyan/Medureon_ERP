const mongoose =
    require("mongoose");

const lendingSchema =
    new mongoose.Schema(
        {
            customer: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Customer",
                required: true,
            },

            sale: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Sale",
            },

            originalAmount: {
                type: Number,
                required: true,
            },

            paidAmount: {
                type: Number,
                default: 0,
            },

            dueAmount: {
                type: Number,
                required: true,
            },

            status: {
                type: String,
                enum: [
                    "active",
                    "paid",
                    "overdue",
                ],
                default: "active",
            },

            notes: {
                type: String,
                default: "",
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
        "Lending",
        lendingSchema
    );