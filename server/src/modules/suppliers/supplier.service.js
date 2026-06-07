const Supplier =
    require("./supplier.model");

const createSupplier =
    async (
        payload,
        userId
    ) => {

        return await Supplier.create({
            ...payload,
            createdBy: userId,
        });

    };

const getSuppliers =
    async (
        page,
        limit,
        search
    ) => {

        const query = {
            isDeleted: false,
        };

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    companyName: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const suppliers =
            await Supplier.find(query)
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Supplier.countDocuments(
                query
            );

        return {
            suppliers,
            total,
            page,
            limit,
        };
    };

const getSupplierById =
    async (id) => {

        return await Supplier.findById(
            id
        );

    };

const updateSupplier =
    async (
        id,
        payload
    ) => {

        return await Supplier.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    };

const deleteSupplier =
    async (id) => {

        return await Supplier.findByIdAndUpdate(
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
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};