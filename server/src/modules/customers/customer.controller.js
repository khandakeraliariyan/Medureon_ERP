const customerService =
    require("./customer.service");

const createCustomer = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await customerService.createCustomer(
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Customer created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getCustomers = async (
    req,
    res,
    next
) => {
    try {
        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 10;

        const search =
            req.query.search || "";

        const result =
            await customerService.getCustomers(
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

const getCustomerById = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await customerService.getCustomerById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCustomer = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await customerService.updateCustomer(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message:
                "Customer updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCustomer = async (
    req,
    res,
    next
) => {
    try {
        await customerService.deleteCustomer(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Customer deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getDueCustomers = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await customerService.getDueCustomers();

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getDueCustomers,
};