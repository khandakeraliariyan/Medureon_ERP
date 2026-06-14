const Employee =
    require("./employee.model");

const generateEmployeeId =
    async () => {

        const count =
            await Employee.countDocuments();

        return `EMP-${String(
            count + 1
        ).padStart(5, "0")}`;

    };

const createEmployee =
    async (
        payload
    ) => {

        const employeeId =
            await generateEmployeeId();

        return await Employee.create({
            ...payload,
            employeeId,
        });

    };

const getEmployees =
    async (
        page,
        limit
    ) => {

        const employees =
            await Employee.find({
                isDeleted: false,
            })
                .populate(
                    "user",
                    "name email role"
                )
                .skip(
                    (page - 1) * limit
                )
                .limit(limit)
                .sort({
                    createdAt: -1,
                });

        const total =
            await Employee.countDocuments({
                isDeleted: false,
            });

        return {
            employees,
            total,
            page,
            limit,
        };
    };

const getEmployeeById =
    async (id) => {

        return await Employee.findById(id)
            .populate(
                "user",
                "name email role"
            );

    };

const getEmployeeById =
    async (id) => {

        return await Employee.findById(id)
            .populate(
                "user",
                "name email role"
            );

    };

const updateEmployee =
    async (
        id,
        payload
    ) => {

        return await Employee.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
    };

const deleteEmployee =
    async (id) => {

        return await Employee.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );
    };

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};