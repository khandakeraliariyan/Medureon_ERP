const { z } =
    require("zod");

const createInvoiceSchema =
    z.object({
        body: z.object({

            invoiceType:
                z.enum([
                    "purchase",
                    "sale",
                ]),

            sale:
                z.string()
                    .optional(),

            stockIn:
                z.string()
                    .optional(),
        }),
    });

module.exports = {
    createInvoiceSchema,
};