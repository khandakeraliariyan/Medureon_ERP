const Sale =
    require("../sales/sale.model");

const StockIn =
    require("../stock-ins/stockIn.model");

const Product =
    require("../products/product.model");

const ProductBatch =
    require(
        "../product-batches/batch.model"
    );

const Customer =
    require("../customers/customer.model");

const Supplier =
    require("../suppliers/supplier.model");

const getSalesReport =
    async (
        startDate,
        endDate
    ) => {

        const sales =
            await Sale.find({
                createdAt: {
                    $gte:
                        new Date(startDate),

                    $lte:
                        new Date(endDate),
                },
            });

        const summary =
            await Sale.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte:
                                new Date(startDate),

                            $lte:
                                new Date(endDate),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,

                        totalSales:
                            { $sum: 1 },

                        totalRevenue:
                            { $sum: "$total" },

                        totalProfit:
                            { $sum: "$profit" },
                    },
                },
            ]);

        return {
            sales,
            summary:
                summary[0] || {},
        };
    };

const getPurchaseReport =
    async (
        startDate,
        endDate
    ) => {

        const purchases =
            await StockIn.find({
                createdAt: {
                    $gte:
                        new Date(startDate),

                    $lte:
                        new Date(endDate),
                },
            })
                .populate("supplier");

        return purchases;
    };

const getInventoryReport =
    async () => {

        return await Product.find()
            .populate("category")
            .populate("supplier");

    };

const getLowStockReport =
    async () => {

        return await Product.find({
            $expr: {
                $lte: [
                    "$totalStock",
                    "$reorderLevel",
                ],
            },
        });

    };

const getExpiryReport =
    async () => {

        return await ProductBatch.find({
            expiryDate: {
                $lte:
                    new Date(
                        Date.now() +
                        30 * 24 * 60 * 60 * 1000
                    ),
            },
        })
            .populate("product");

    };

const getCustomerDueReport =
    async () => {

        return await Customer.find({
            dueBalance: {
                $gt: 0,
            },
        });

    };

const getSupplierDueReport =
    async () => {

        return await Supplier.find({
            dueAmount: {
                $gt: 0,
            },
        });

    };

module.exports = {
    getSalesReport,
    getPurchaseReport,
    getInventoryReport,
    getLowStockReport,
    getExpiryReport,
    getCustomerDueReport,
    getSupplierDueReport,
};