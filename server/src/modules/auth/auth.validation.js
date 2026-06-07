const { z } = require("zod");

const registerSchema = z.object({
    body: z.object({
        name: z.string().min(3),

        email: z.string().email(),

        password: z
            .string()
            .min(6)
            .max(50),

        role: z.enum([
            "admin",
            "manager",
            "cashier",
            "inventory",
        ]),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),

        password: z.string(),
    }),
});

const changePasswordSchema =
    z.object({
        body: z.object({

            oldPassword:
                z.string(),

            newPassword:
                z.string()
                    .min(6),

        }),
    });

module.exports = {
    registerSchema,
    loginSchema,
    changePasswordSchema,
};