const categoryService =
    require("./category.service");

const createCategory =
    async (req, res, next) => {
        try {

            const result =
                await categoryService
                    .createCategory(
                        req.body
                    );

            res.status(201).json({
                success: true,
                message:
                    "Category created successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getCategories =
    async (req, res, next) => {
        try {

            const result =
                await categoryService
                    .getCategories();

            res.json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getCategoryById =
    async (req, res, next) => {
        try {

            const result =
                await categoryService
                    .getCategoryById(
                        req.params.id
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const updateCategory =
    async (req, res, next) => {
        try {

            const result =
                await categoryService
                    .updateCategory(
                        req.params.id,
                        req.body
                    );

            res.json({
                success: true,
                message:
                    "Category updated",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const deleteCategory =
    async (req, res, next) => {
        try {

            await categoryService
                .deleteCategory(
                    req.params.id
                );

            res.json({
                success: true,
                message:
                    "Category deleted",
            });

        } catch (error) {
            next(error);
        }
    };

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};