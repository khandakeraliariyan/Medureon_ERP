const Category =
    require("./category.model");

const createCategory =
    async (payload) => {

        const exists =
            await Category.findOne({
                name: payload.name,
                isDeleted: false,
            });

        if (exists) {
            throw new Error(
                "Category already exists"
            );
        }

        return await Category.create(
            payload
        );
    };

const getCategories =
    async () => {

        return await Category.find({
            isDeleted: false,
        });

    };

const updateCategory =
    async (
        id,
        payload
    ) => {

        return await Category.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    };

const deleteCategory =
    async (id) => {

        return await Category.findByIdAndUpdate(
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
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};