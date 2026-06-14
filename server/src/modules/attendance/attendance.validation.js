const { z } =
    require("zod");

const checkInSchema =
    z.object({
        body: z.object({
            employee:
                z.string(),
        }),
    });

const checkOutSchema =
    z.object({
        body: z.object({
            employee:
                z.string(),
        }),
    });

module.exports = {
    checkInSchema,
    checkOutSchema,
};