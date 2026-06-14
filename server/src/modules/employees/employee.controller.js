const employeeService =
    require("./employee.service");

const createEmployee =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await employeeService
                    .createEmployee(
                        req.body
                    );

            res.status(201).json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getEmployees =
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

            const result =
                await employeeService
                    .getEmployees(
                        page,
                        limit
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getEmployeeById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await employeeService
                    .getEmployeeById(
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

const updateEmployee =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await employeeService
                    .updateEmployee(
                        req.params.id,
                        req.body
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const deleteEmployee =
    async (
        req,
        res,
        next
    ) => {

        try {

            await employeeService
                .deleteEmployee(
                    req.params.id
                );

            res.json({
                success: true,
                message:
                    "Employee deleted",
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};