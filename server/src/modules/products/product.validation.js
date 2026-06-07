const { z } =
    require("zod");

const createProductSchema =
    z.object({
        body: z.object({

            name:
                z.string().min(2),

            genericName:
                z.string(),

            brand:
                z.string(),

            category:
                z.string(),

            supplier:
                z.string(),

            barcode:
                z.string(),

            sku:
                z.string(),

            batchNumber:
                z.string(),

            expiryDate:
                z.string(),

            buyingPrice:
                z.number(),

            sellingPrice:
                z.number(),

            reorderLevel:
                z.number()
                    .optional(),

            unit:
                z.string()
                    .optional(),
        }),
    });

module.exports = {
    createProductSchema,
};