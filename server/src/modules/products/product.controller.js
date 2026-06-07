const productService =
    require("./product.service");

const createProduct =
    async (
        req,
        res,
        next
    ) => {
        try {

            const result =
                await productService
                    .createProduct(
                        req.body
                    );

            res.status(201).json({
                success: true,
                message:
                    "Product created successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getProducts =
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

            const search =
                req.query.search || "";

            const result =
                await productService
                    .getProducts(
                        page,
                        limit,
                        search
                    );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getProductById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await productService
                    .getProductById(
                        req.params.id
                    );

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
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

const updateProduct =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await productService
                    .updateProduct(
                        req.params.id,
                        req.body
                    );

            res.status(200).json({
                success: true,
                message:
                    "Product updated successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const deleteProduct =
    async (
        req,
        res,
        next
    ) => {

        try {

            await productService
                .deleteProduct(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                message:
                    "Product deleted successfully",
            });

        } catch (error) {
            next(error);
        }
    };

const getLowStockProducts =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await productService
                    .getLowStockProducts();

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getExpiredProducts =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await productService
                    .getExpiredProducts();

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getExpiringSoonProducts =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await productService
                    .getExpiringSoonProducts();

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getProductByBarcode =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await productService
                    .getProductByBarcode(
                        req.params.barcode
                    );

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
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

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    getExpiredProducts,
    getExpiringSoonProducts,
    getProductByBarcode,
};