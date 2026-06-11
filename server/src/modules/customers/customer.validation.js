const { z } =
    require("zod");

const createCustomerSchema =
    z.object({
        body: z.object({

            name:
                z.string()
                    .min(2),

            phone:
                z.string()
                    .min(6),

            email:
                z.string()
                    .email()
                    .optional(),

            address:
                z.string()
                    .optional(),

            creditLimit:
                z.number()
                    .optional(),
        }),
    });

const updateCustomerSchema =
    z.object({
        body: z.object({

            name:
                z.string()
                    .optional(),

            phone:
                z.string()
                    .optional(),

            email:
                z.string()
                    .email()
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
    createCustomerSchema,
    updateCustomerSchema,
};