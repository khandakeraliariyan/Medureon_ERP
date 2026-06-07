const { z } =
    require("zod");

const createCategorySchema =
    z.object({
        body: z.object({
            name:
                z.string()
                    .min(2),

            description:
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

const updateCategorySchema =
    z.object({
        body: z.object({
            name:
                z.string()
                    .optional(),

            description:
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
    createCategorySchema,
    updateCategorySchema,
};