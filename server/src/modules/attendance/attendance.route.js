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
        "./attendance.controller"
    );

const {
    checkInSchema,
    checkOutSchema,
} =
    require(
        "./attendance.validation"
    );

router.post(
    "/check-in",
    protect,
    validateRequest(
        checkInSchema
    ),
    controller.checkIn
);

router.post(
    "/check-out",
    protect,
    validateRequest(
        checkOutSchema
    ),
    controller.checkOut
);

router.get(
    "/",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getAttendance
);

router.get(
    "/employee/:employeeId",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.getEmployeeAttendance
);

module.exports =
    router;