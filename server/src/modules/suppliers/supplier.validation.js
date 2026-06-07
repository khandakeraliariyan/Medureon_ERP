const { z } =
    require("zod");

const createSupplierSchema =
    z.object({
        body: z.object({
            name: z.string().min(2),

            companyName:
                z.string().min(2),

            email:
                z.string().email(),

            phone:
                z.string().min(6),

            address:
                z.string(),

            status: z.enum([
                "active",
                "inactive",
            ]),
        }),
    });

const updateSupplierSchema =
    z.object({
        body: z.object({
            name:
                z.string().optional(),

            companyName:
                z.string().optional(),

            email:
                z.string()
                    .email()
                    .optional(),

            phone:
                z.string()
                    .optional(),

            address:
                z.string()
                    .optional(),

            status:
                z.enum([
                    "active",
                    "inactive",
                ])
                    .optional(),
        }),
    });

module.exports = {
    createSupplierSchema,
    updateSupplierSchema,
};