const { z } =
    require("zod");

const createBatchSchema =
    z.object({
        body: z.object({

            product:
                z.string(),

            batchNumber:
                z.string(),

            expiryDate:
                z.string(),

            buyingPrice:
                z.number(),

            sellingPrice:
                z.number(),

            quantity:
                z.number()
                    .positive(),

        }),
    });

module.exports = {
    createBatchSchema,
};