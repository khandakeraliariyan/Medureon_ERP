const Customer =
    require("./customer.model");

const generateCustomerCode =
    async () => {

        const count =
            await Customer.countDocuments();

        return `CUS-${String(
            count + 1
        ).padStart(5, "0")}`;

    };

const createCustomer =
    async (payload) => {

        const existing =
            await Customer.findOne({
                phone:
                    payload.phone,
            });

        if (existing) {
            throw new Error(
                "Customer already exists"
            );
        }

        const customerCode =
            await generateCustomerCode();

        return await Customer.create({
            ...payload,
            customerCode,
        });

    };

const getCustomers =
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
                    phone: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const customers =
            await Customer.find(query)
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Customer.countDocuments(
                query
            );

        return {
            customers,
            total,
            page,
            limit,
        };
    };

const getCustomerById =
    async (id) => {

        const customer =
            await Customer.findOne({
                _id: id,
                isDeleted: false,
            });

        if (!customer) {
            throw new Error(
                "Customer not found"
            );
        }

        return customer;
    };

const updateCustomer =
    async (
        id,
        payload
    ) => {

        return await Customer.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
    };

const deleteCustomer =
    async (id) => {

        return await Customer.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );
    };

const getDueCustomers =
    async () => {

        return await Customer.find({
            dueBalance: {
                $gt: 0,
            },
            isDeleted: false,
        });

    };

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getDueCustomers,
};