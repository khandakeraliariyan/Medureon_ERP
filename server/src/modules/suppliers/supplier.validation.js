const { z } =
    require("zod");

const createSupplierSchema =
    z.object({
        body: z.object({
            name:
                z.string(),

            companyName:
                z.string(),

            email:
                z.string().email(),

            phone:
                z.string(),

            address:
                z.string(),

            dueAmount:
                z.number()
                    .default(0),

            status: z.enum([
                "active",
                "inactive",
            ]),
        }),
    });

module.exports = {
    createSupplierSchema,
};