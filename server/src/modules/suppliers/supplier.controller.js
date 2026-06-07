const supplierService =
    require("./supplier.service");

const createSupplier =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await supplierService
                    .createSupplier(
                        req.body,
                        req.user._id
                    );

            res.status(201).json({
                success: true,
                message:
                    "Supplier created",
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getSuppliers =
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

            const search =
                req.query.search || "";

            const result =
                await supplierService
                    .getSuppliers(
                        page,
                        limit,
                        search
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getSupplier =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await supplierService
                    .getSupplierById(
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

const updateSupplier =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await supplierService
                    .updateSupplier(
                        req.params.id,
                        req.body
                    );

            res.json({
                success: true,
                message:
                    "Supplier updated",
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const deleteSupplier =
    async (
        req,
        res,
        next
    ) => {

        try {

            await supplierService
                .deleteSupplier(
                    req.params.id
                );

            res.json({
                success: true,
                message:
                    "Supplier deleted",
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier,
};
