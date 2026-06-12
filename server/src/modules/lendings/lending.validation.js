const { z } =
    require("zod");

const createLendingSchema =
    z.object({
        body: z.object({

            customer:
                z.string(),

            sale:
                z.string()
                    .optional(),

            originalAmount:
                z.number()
                    .positive(),

            notes:
                z.string()
                    .optional(),
        }),
    });

const payInstallmentSchema =
    z.object({
        body: z.object({

            amount:
                z.number()
                    .positive(),

            paymentMethod:
                z.enum([
                    "cash",
                    "card",
                    "mobile-banking",
                ]),

            note:
                z.string()
                    .optional(),
        }),
    });

module.exports = {
    createLendingSchema,
    payInstallmentSchema,
}; 