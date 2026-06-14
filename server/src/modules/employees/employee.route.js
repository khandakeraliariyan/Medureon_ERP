const express =
    require("express");

const router =
    express.Router();

const protect =
    require(
        "../../middleware/authMiddleware"
    );

const authorize =
    require(
        "../../middleware/roleMiddleware"
    );

const validateRequest =
    require(
        "../../middleware/validateRequest"
    );

const controller =
    require(
        "./employee.controller"
    );

const {
    createEmployeeSchema,
    updateEmployeeSchema,
} =
    require(
        "./employee.validation"
    );

router.post(
    "/",
    protect,
    authorize(
        "admin"
    ),
    validateRequest(
        createEmployeeSchema
    ),
    controller.createEmployee
);

router.get(
    "/",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getEmployees
);

router.get(
    "/:id",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getEmployeeById
);

router.patch(
    "/:id",
    protect,
    authorize(
        "admin"
    ),
    validateRequest(
        updateEmployeeSchema
    ),
    controller.updateEmployee
);

router.delete(
    "/:id",
    protect,
    authorize(
        "admin"
    ),
    controller.deleteEmployee
);

module.exports =
    router;