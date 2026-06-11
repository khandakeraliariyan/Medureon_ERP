const mongoose = require("mongoose");

const Sale = require("./sale.model");
const SaleItem = require("./saleItem.model");

const Customer =
    require("../customers/customer.model");

const Product =
    require("../products/product.model");

const ProductBatch =
    require("../product-batches/batch.model");

const InventoryTransaction =
    require(
        "../inventory-transactions/inventoryTransaction.model"
    );

const generateInvoiceNumber =
    async () => {

        const count =
            await Sale.countDocuments();

        return `INV-${String(
            count + 1
        ).padStart(6, "0")}`;

    };

const allocateBatchesFEFO =
    async (
        productId,
        quantityNeeded,
        session
    ) => {

        const batches =
            await ProductBatch.find({
                product: productId,

                availableQuantity: {
                    $gt: 0,
                },

                expiryDate: {
                    $gt: new Date(),
                },

                isDeleted: false,
            })
                .sort({
                    expiryDate: 1,
                });

        let remaining =
            quantityNeeded;

        const allocations = [];

        for (
            const batch
            of batches
        ) {

            if (
                remaining <= 0
            ) {
                break;
            }

            const allocated =
                Math.min(
                    remaining,
                    batch.availableQuantity
                );

            allocations.push({
                batch,
                quantity:
                    allocated,
            });

            remaining -=
                allocated;
        }

        if (
            remaining > 0
        ) {
            throw new Error(
                "Insufficient stock"
            );
        }

        return allocations;
    };

const createSale =
    async (
        payload,
        userId
    ) => {

        const session =
            await mongoose.startSession();

        session.startTransaction();

        try {

            let subtotal = 0;

            let totalProfit = 0;

            const invoiceNumber =
                await generateInvoiceNumber();

            const saleItemsData =
                [];

            for (
                const item
                of payload.items
            ) {

                const product =
                    await Product.findById(
                        item.product
                    );

                if (!product) {
                    throw new Error(
                        "Product not found"
                    );
                }

                const allocations =
                    await allocateBatchesFEFO(
                        item.product,
                        item.quantity,
                        session
                    );

                for (
                    const allocation
                    of allocations
                ) {

                    const batch =
                        allocation.batch;

                    const qty =
                        allocation.quantity;

                    const lineTotal =
                        qty *
                        batch.sellingPrice;

                    const lineProfit =
                        (
                            batch.sellingPrice -
                            batch.buyingPrice
                        ) * qty;

                    subtotal +=
                        lineTotal;

                    totalProfit +=
                        lineProfit;

                    batch.availableQuantity -=
                        qty;

                    await batch.save({
                        session,
                    });

                    await Product.findByIdAndUpdate(
                        product._id,
                        {
                            $inc: {
                                totalStock:
                                    -qty,
                            },
                        },
                        { session }
                    );

                    saleItemsData.push({
                        product:
                            product._id,

                        batch:
                            batch._id,

                        quantity:
                            qty,

                        buyingPrice:
                            batch.buyingPrice,

                        sellingPrice:
                            batch.sellingPrice,

                        totalPrice:
                            lineTotal,

                        profit:
                            lineProfit,
                    });

                    await InventoryTransaction.create(
                        [{
                            product:
                                product._id,

                            batch:
                                batch._id,

                            quantity:
                                qty,

                            type:
                                "sale",

                            createdBy:
                                userId,
                        }],
                        { session }
                    );
                }
            }

            const discount =
                payload.discount || 0;

            const tax =
                payload.tax || 0;

            const total =
                subtotal -
                discount +
                tax;

            const dueAmount =
                total -
                payload.paidAmount;

            let paymentStatus =
                "paid";

            if (
                dueAmount > 0 &&
                payload.paidAmount > 0
            ) {
                paymentStatus =
                    "partial";
            }

            if (
                payload.paidAmount === 0
            ) {
                paymentStatus =
                    "due";
            }

            const sale =
                await Sale.create(
                    [{
                        invoiceNumber,

                        customer:
                            payload.customer,

                        subtotal,

                        discount,

                        tax,

                        total,

                        paidAmount:
                            payload.paidAmount,

                        dueAmount,

                        profit:
                            totalProfit,

                        paymentMethod:
                            payload.paymentMethod,

                        paymentStatus,

                        createdBy:
                            userId,
                    }],
                    { session }
                );

            const saleId =
                sale[0]._id;

            const saleItems =
                saleItemsData.map(
                    item => ({
                        sale: saleId,
                        ...item,
                    })
                );

            await SaleItem.insertMany(
                saleItems,
                { session }
            );

            if (
                payload.customer
            ) {

                await Customer.findByIdAndUpdate(
                    payload.customer,
                    {
                        $inc: {
                            dueBalance:
                                dueAmount,

                            totalPurchases: 1,

                            totalSpent:
                                total,
                        },
                    },
                    { session }
                );
            }

            await session.commitTransaction();

            return await Sale.findById(
                saleId
            )
                .populate("customer")
                .populate(
                    "createdBy",
                    "name role"
                );

        } catch (error) {

            await session.abortTransaction();

            throw error;

        } finally {

            session.endSession();

        }
    };

const getSales =
    async (
        page,
        limit
    ) => {

        const sales =
            await Sale.find()
                .populate("customer")
                .populate(
                    "createdBy",
                    "name role"
                )
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Sale.countDocuments();

        return {
            sales,
            total,
            page,
            limit,
        };
    };

const getSaleById =
    async (id) => {

        const sale =
            await Sale.findById(id)
                .populate("customer")
                .populate(
                    "createdBy",
                    "name role"
                );

        const items =
            await SaleItem.find({
                sale: id,
            })
                .populate("product")
                .populate("batch");

        return {
            sale,
            items,
        };
    };

const getCustomerSales =
    async (
        customerId
    ) => {

        return await Sale.find({
            customer:
                customerId,
        })
            .sort({
                createdAt: -1,
            });

    };

module.exports = {
    createSale,
    getSales,
    getSaleById,
    getCustomerSales,
};