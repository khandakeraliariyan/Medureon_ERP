const mongoose =
    require("mongoose");

const auditLogSchema =
    new mongoose.Schema(
        {
            user: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            action: {
                type: String,
                required: true,
            },

            module: {
                type: String,
                required: true,
            },

            entityId: {
                type:
                    mongoose.Schema.Types.ObjectId,
            },

            oldData: {
                type: mongoose.Schema.Types.Mixed,
                default: null,
            },

            newData: {
                type: mongoose.Schema.Types.Mixed,
                default: null,
            },

            ipAddress: {
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
        "AuditLog",
        auditLogSchema
    );