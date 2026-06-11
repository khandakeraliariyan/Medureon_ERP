const Product =
    require("./product.model");

const createProduct =
    async (payload) => {

        const exists =
            await Product.findOne({
                barcode:
                    payload.barcode,
            });

        if (exists) {
            throw new Error(
                "Barcode already exists"
            );
        }

        return await Product.create(
            payload
        );
    };

const getProducts =
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
                    genericName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    barcode: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const products =
            await Product.find(query)
                .populate(
                    "category"
                )
                .populate(
                    "supplier"
                )
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Product.countDocuments(
                query
            );

        return {
            products,
            total,
            page,
            limit,
        };
    };

const getProductById =
    async (id) => {

        return await Product
            .findById(id)
            .populate("category")
            .populate("supplier");
    };

const updateProduct =
    async (
        id,
        payload
    ) => {

        return await Product.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
    };

const deleteProduct =
    async (id) => {

        return await Product.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );
    };

const getLowStockProducts =
    async () => {

        return await Product.find({
            $expr: {
                $lte: [
                    "$stockQuantity",
                    "$reorderLevel",
                ],
            },
            isDeleted: false,
        });

    };

const getExpiredProducts =
    async () => {

        return await Product.find({
            expiryDate: {
                $lt: new Date(),
            },
            isDeleted: false,
        });

    };

const getExpiringSoonProducts =
    async () => {

        const next30Days =
            new Date();

        next30Days.setDate(
            next30Days.getDate() + 30
        );

        return await Product.find({
            expiryDate: {
                $lte: next30Days,
                $gte: new Date(),
            },
            isDeleted: false,
        });

    };

const getProductByBarcode =
    async (barcode) => {

        return await Product.findOne({
            barcode,
            isDeleted: false,
        })
            .populate("category")
            .populate("supplier");
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