const { z } =
    require("zod");

const updateSettingSchema =
    z.object({
        body: z.object({

            pharmacyName:
                z.string()
                    .optional(),

            pharmacyAddress:
                z.string()
                    .optional(),

            pharmacyPhone:
                z.string()
                    .optional(),

            pharmacyEmail:
                z.string()
                    .email()
                    .optional(),

            invoicePrefix:
                z.string()
                    .optional(),

            purchasePrefix:
                z.string()
                    .optional(),

            currency:
                z.string()
                    .optional(),

            taxPercentage:
                z.number()
                    .optional(),

            lowStockThreshold:
                z.number()
                    .optional(),

            allowNegativeStock:
                z.boolean()
                    .optional(),

            enableCustomerCredit:
                z.boolean()
                    .optional(),

            enableNotifications:
                z.boolean()
                    .optional(),

            logoUrl:
                z.string()
                    .optional(),
        }),
    });

module.exports = {
    updateSettingSchema,
};