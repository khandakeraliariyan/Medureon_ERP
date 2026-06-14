const { z } =
    require("zod");

const createEmployeeSchema =
    z.object({
        body: z.object({

            user:
                z.string(),

            fullName:
                z.string(),

            phone:
                z.string(),

            email:
                z.string().email(),

            designation:
                z.string(),

            department:
                z.string().optional(),

            salary:
                z.number().optional(),

            joiningDate:
                z.string(),

            dateOfBirth:
                z.string().optional(),

            address:
                z.string().optional(),

            emergencyContact:
                z.string().optional(),
        }),
    });

const updateEmployeeSchema =
    z.object({
        body: z.object({

            fullName:
                z.string().optional(),

            phone:
                z.string().optional(),

            designation:
                z.string().optional(),

            salary:
                z.number().optional(),

            status:
                z.enum([
                    "active",
                    "inactive",
                    "terminated",
                ])
                    .optional(),
        }),
    });

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema,
};