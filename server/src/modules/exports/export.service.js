const ExcelJS =
    require("exceljs");

const PDFDocument =
    require("pdfkit");

const fs =
    require("fs");

const path =
    require("path");

const Sale =
    require("../sales/sale.model");

const Product =
    require("../products/product.model");

const Customer =
    require("../customers/customer.model");

const Supplier =
    require("../suppliers/supplier.model");

const exportSalesExcel =
    async () => {

        const sales =
            await Sale.find();

        const workbook =
            new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet(
                "Sales Report"
            );

        worksheet.columns = [
            {
                header:
                    "Invoice",

                key:
                    "invoiceNumber",

                width: 20,
            },
            {
                header:
                    "Total",

                key:
                    "total",

                width: 15,
            },
            {
                header:
                    "Profit",

                key:
                    "profit",

                width: 15,
            },
        ];

        sales.forEach(
            sale => {
                worksheet.addRow({
                    invoiceNumber:
                        sale.invoiceNumber,

                    total:
                        sale.total,

                    profit:
                        sale.profit,
                });
            }
        );

        const fileName =
            `sales-${Date.now()}.xlsx`;

        const filePath =
            path.join(
                "uploads",
                fileName
            );

        await workbook.xlsx.writeFile(
            filePath
        );

        return filePath;
    };

const exportInventoryExcel =
    async () => {

        const products =
            await Product.find();

        const workbook =
            new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet(
                "Inventory"
            );

        worksheet.columns = [
            {
                header:
                    "Product",

                key:
                    "name",
            },

            {
                header:
                    "Stock",

                key:
                    "stock",
            },
        ];

        products.forEach(
            product => {

                worksheet.addRow({
                    name:
                        product.name,

                    stock:
                        product.totalStock,
                });

            });

        const fileName =
            `inventory-${Date.now()}.xlsx`;

        const filePath =
            path.join(
                "uploads",
                fileName
            );

        await workbook.xlsx.writeFile(
            filePath
        );

        return filePath;
    };

const exportCustomerDueExcel =
    async () => {

        const customers =
            await Customer.find({
                dueBalance: {
                    $gt: 0,
                },
            });

        const workbook =
            new ExcelJS.Workbook();

        const sheet =
            workbook.addWorksheet(
                "Customer Dues"
            );

        sheet.columns = [
            {
                header:
                    "Customer",

                key:
                    "name",
            },

            {
                header:
                    "Due",

                key:
                    "due",
            },
        ];

        customers.forEach(
            customer => {

                sheet.addRow({
                    name:
                        customer.name,

                    due:
                        customer.dueBalance,
                });

            });

        const fileName =
            `customer-due-${Date.now()}.xlsx`;

        const filePath =
            path.join(
                "uploads",
                fileName
            );

        await workbook.xlsx.writeFile(
            filePath
        );

        return filePath;
    };

const exportInvoicePdf =
    async (
        sale
    ) => {

        const doc =
            new PDFDocument();

        const fileName =
            `invoice-${sale.invoiceNumber}.pdf`;

        const filePath =
            path.join(
                "uploads",
                fileName
            );

        doc.pipe(
            fs.createWriteStream(
                filePath
            )
        );

        doc.fontSize(20);

        doc.text(
            "Pharmacy Invoice"
        );

        doc.moveDown();

        doc.text(
            `Invoice: ${sale.invoiceNumber}`
        );

        doc.text(
            `Total: ${sale.total}`
        );

        doc.text(
            `Paid: ${sale.paidAmount}`
        );

        doc.text(
            `Due: ${sale.dueAmount}`
        );

        doc.end();

        return filePath;
    };

module.exports = {
    exportSalesExcel,
    exportInventoryExcel,
    exportCustomerDueExcel,
    exportInvoicePdf,
};