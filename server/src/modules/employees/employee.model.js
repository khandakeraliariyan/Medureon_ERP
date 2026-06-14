const mongoose =
    require("mongoose");

const employeeSchema =
    new mongoose.Schema(
        {
            employeeId: {
                type: String,
                unique: true,
                required: true,
            },

            user: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            fullName: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
            },

            designation: {
                type: String,
                required: true,
            },

            department: {
                type: String,
                default: "Pharmacy",
            },

            salary: {
                type: Number,
                default: 0,
            },

            joiningDate: {
                type: Date,
                required: true,
            },

            dateOfBirth: {
                type: Date,
            },

            address: {
                type: String,
            },

            emergencyContact: {
                type: String,
            },

            profileImage: {
                type: String,
                default: "",
            },

            status: {
                type: String,
                enum: [
                    "active",
                    "inactive",
                    "terminated",
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
        "Employee",
        employeeSchema
    );