const exportService =
    require("./export.service");

const salesExcel =
    async (
        req,
        res,
        next
    ) => {

        try {

            const file =
                await exportService
                    .exportSalesExcel();

            res.download(file);

        } catch (err) {
            next(err);
        }

    };

const inventoryExcel =
    async (
        req,
        res,
        next
    ) => {

        try {

            const file =
                await exportService
                    .exportInventoryExcel();

            res.download(file);

        } catch (err) {
            next(err);
        }

    };

const customerDueExcel =
    async (
        req,
        res,
        next
    ) => {

        try {

            const file =
                await exportService
                    .exportCustomerDueExcel();

            res.download(file);

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    salesExcel,
    inventoryExcel,
    customerDueExcel,
};