const express =
    require("express");

const router =
    express.Router();

const protect =
    require("../../middleware/authMiddleware");

const authorize =
    require("../../middleware/roleMiddleware");

const validateRequest =
    require("../../middleware/validateRequest");

const controller =
    require("./category.controller");

const {
    createCategorySchema,
    updateCategorySchema,
} =
    require("./category.validation");

router.post(
    "/",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    validateRequest(
        createCategorySchema
    ),
    controller.createCategory
);

router.get(
    "/",
    protect,
    controller.getCategories
);

router.get(
    "/:id",
    protect,
    controller.getCategoryById
);

router.patch(
    "/:id",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    validateRequest(
        updateCategorySchema
    ),
    controller.updateCategory
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    controller.deleteCategory
);

module.exports = router;