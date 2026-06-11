const { z } = require("zod");

const saleItemSchema = z.object({
    product: z.string().min(1),
    quantity: z.number().int().positive(),
});

const createSaleSchema = z.object({
    body: z.object({
        customer: z.string().optional(),

        items: z
            .array(saleItemSchema)
            .min(1, "At least one item is required"),

        discount: z
            .number()
            .min(0)
            .optional(),

        tax: z
            .number()
            .min(0)
            .optional(),

        paidAmount: z
            .number()
            .min(0),

        paymentMethod: z.enum([
            "cash",
            "card",
            "mobile-banking",
        ]),
    }),
});

module.exports = {
    createSaleSchema,
};