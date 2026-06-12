const Sale =
    require("../sales/sale.model");

const Product =
    require("../products/product.model");

const ProductBatch =
    require("../product-batches/batch.model");

const Customer =
    require("../customers/customer.model");

const Supplier =
    require("../suppliers/supplier.model");

const Lending =
    require("../lendings/lending.model");

const getDashboardSummary =
    async () => {

        const totalSales =
            await Sale.countDocuments();

        const totalRevenue =
            await Sale.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$total",
                        },
                    },
                },
            ]);

        const totalProfit =
            await Sale.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$profit",
                        },
                    },
                },
            ]);

        const lowStockProducts =
            await Product.countDocuments({
                $expr: {
                    $lte: [
                        "$totalStock",
                        "$reorderLevel",
                    ],
                },
            });

        const expiredProducts =
            await ProductBatch.countDocuments({
                expiryDate: {
                    $lt: new Date(),
                },
            });

        const customerDue =
            await Customer.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum:
                                "$dueBalance",
                        },
                    },
                },
            ]);

        const supplierDue =
            await Supplier.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum:
                                "$dueAmount",
                        },
                    },
                },
            ]);

        return {
            totalSales,

            totalRevenue:
                totalRevenue[0]?.total || 0,

            totalProfit:
                totalProfit[0]?.total || 0,

            lowStockProducts,

            expiredProducts,

            customerDue:
                customerDue[0]?.total || 0,

            supplierDue:
                supplierDue[0]?.total || 0,
        };
    };

const getMonthlySales =
    async () => {

        return await Sale.aggregate([
            {
                $group: {
                    _id: {
                        month: {
                            $month:
                                "$createdAt",
                        },
                    },

                    revenue: {
                        $sum:
                            "$total",
                    },

                    profit: {
                        $sum:
                            "$profit",
                    },
                },
            },
            {
                $sort: {
                    "_id.month": 1,
                },
            },
        ]);
    };

const getTopCustomers =
    async () => {

        return await Customer.find()
            .sort({
                totalSpent: -1,
            })
            .limit(10);

    };

const SaleItem =
    require(
        "../sales/saleItem.model"
    );

const getTopProducts =
    async () => {

        return await SaleItem.aggregate([
            {
                $group: {
                    _id:
                        "$product",

                    quantity: {
                        $sum:
                            "$quantity",
                    },
                },
            },
            {
                $sort: {
                    quantity: -1,
                },
            },
            {
                $limit: 10,
            },
        ]);
    };

const getRevenueTrend =
    async () => {

        return await Sale.aggregate([
            {
                $group: {
                    _id: {
                        year: {
                            $year:
                                "$createdAt",
                        },

                        month: {
                            $month:
                                "$createdAt",
                        },
                    },

                    revenue: {
                        $sum:
                            "$total",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);
    };

module.exports = {
    getDashboardSummary,
    getMonthlySales,
    getTopCustomers,
    getTopProducts,
    getRevenueTrend,
};