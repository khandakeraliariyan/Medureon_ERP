const { z } =
    require("zod");

const stockItemSchema =
    z.object({
        product:
            z.string(),

        batchNumber:
            z.string(),

        expiryDate:
            z.string(),

        quantity:
            z.number().positive(),

        buyingPrice:
            z.number().positive(),

        sellingPrice:
            z.number().positive(),
    });

const createStockInSchema =
    z.object({
        body: z.object({

            supplier:
                z.string(),

            items:
                z.array(
                    stockItemSchema
                ).min(1),

            totalAmount:
                z.number(),

            paidAmount:
                z.number(),

            note:
                z.string()
                    .optional(),
        }),
    });

module.exports = {
    createStockInSchema,
};