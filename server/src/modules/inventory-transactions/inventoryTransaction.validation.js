const { z } =
    require("zod");

const createTransactionSchema =
    z.object({
        body: z.object({

            product:
                z.string(),

            batch:
                z.string()
                    .optional(),

            type: z.enum([
                "purchase",
                "sale",
                "return",
                "adjustment",
                "damage",
            ]),

            quantity:
                z.number()
                    .positive(),

            note:
                z.string()
                    .optional(),
        }),
    });

module.exports = {
    createTransactionSchema,
};