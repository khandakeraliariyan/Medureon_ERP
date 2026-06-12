const mongoose =
    require("mongoose");

const lendingPaymentSchema =
    new mongoose.Schema(
        {
            lending: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Lending",
                required: true,
            },

            amount: {
                type: Number,
                required: true,
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

            note: {
                type: String,
                default: "",
            },

            receivedBy: {
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
        "LendingPayment",
        lendingPaymentSchema
    );