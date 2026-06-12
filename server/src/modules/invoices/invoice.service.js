const Invoice =
    require("./invoice.model");

const Sale =
    require("../sales/sale.model");

const StockIn =
    require("../stock-ins/stockIn.model");

const generateInvoiceNumber =
    async () => {

        const count =
            await Invoice.countDocuments();

        return `ERP-INV-${String(
            count + 1
        ).padStart(6, "0")}`;

    };

const createInvoice =
    async (
        payload,
        userId
    ) => {

        const invoiceNumber =
            await generateInvoiceNumber();

        if (
            payload.invoiceType ===
            "sale"
        ) {

            const sale =
                await Sale.findById(
                    payload.sale
                );

            if (!sale) {
                throw new Error(
                    "Sale not found"
                );
            }
        }

        if (
            payload.invoiceType ===
            "purchase"
        ) {

            const stockIn =
                await StockIn.findById(
                    payload.stockIn
                );

            if (!stockIn) {
                throw new Error(
                    "Stock In not found"
                );
            }
        }

        return await Invoice.create({
            ...payload,
            invoiceNumber,
            generatedBy:
                userId,
        });
    };

const getInvoices =
    async (
        page,
        limit
    ) => {

        const invoices =
            await Invoice.find()
                .populate(
                    "generatedBy",
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
            await Invoice.countDocuments();

        return {
            invoices,
            total,
            page,
            limit,
        };
    };

const getInvoiceById =
    async (id) => {

        return await Invoice.findById(
            id
        )
            .populate(
                "generatedBy",
                "name role"
            )
            .populate("sale")
            .populate("stockIn");
    };

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
};