const invoiceService =
    require("./invoice.service");

const createInvoice =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await invoiceService
                    .createInvoice(
                        req.body,
                        req.user._id
                    );

            res.status(201).json({
                success: true,
                message:
                    "Invoice generated",
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getInvoices =
    async (
        req,
        res,
        next
    ) => {

        try {

            const page =
                Number(
                    req.query.page
                ) || 1;

            const limit =
                Number(
                    req.query.limit
                ) || 10;

            const result =
                await invoiceService
                    .getInvoices(
                        page,
                        limit
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getInvoiceById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await invoiceService
                    .getInvoiceById(
                        req.params.id
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
};