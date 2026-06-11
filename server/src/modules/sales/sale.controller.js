const saleService =
    require("./sale.service");

const createSale =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await saleService.createSale(
                    req.body,
                    req.user._id
                );

            res.status(201).json({
                success: true,
                message:
                    "Sale created successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getSales =
    async (
        req,
        res,
        next
    ) => {

        try {

            const page =
                Number(req.query.page)
                || 1;

            const limit =
                Number(req.query.limit)
                || 10;

            const result =
                await saleService.getSales(
                    page,
                    limit
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getSaleById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await saleService.getSaleById(
                    req.params.id
                );

            if (!result.sale) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Sale not found",
                });
            }

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getCustomerSales =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await saleService.getCustomerSales(
                    req.params.customerId
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

module.exports = {
    createSale,
    getSales,
    getSaleById,
    getCustomerSales,
};