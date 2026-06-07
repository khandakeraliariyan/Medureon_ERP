const validateRequest =
    (schema) =>
        (req, res, next) => {
            const result =
                schema.safeParse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Validation Error",
                    errors:
                        result.error.flatten(),
                });
            }

            req.validatedData =
                result.data;

            next();
        };

module.exports =
    validateRequest;