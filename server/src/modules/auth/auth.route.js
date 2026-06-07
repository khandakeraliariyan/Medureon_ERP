const express =
    require("express");

const router =
    express.Router();

const validateRequest =
    require("../../middleware/validateRequest");

const protect =
    require("../../middleware/authMiddleware");

const authorize =
    require("../../middleware/roleMiddleware");

const {
    registerSchema,
    loginSchema,
    changePasswordSchema,
} =
    require("./auth.validation");

const {
    register,
    login,
    getProfile,
    changePassword,
    getUsers,
    updateRole,
} =
    require("./auth.controller");

router.post(
    "/register",
    validateRequest(
        registerSchema
    ),
    register
);

router.post(
    "/login",
    validateRequest(
        loginSchema
    ),
    login
);

router.get(
    "/me",
    protect,
    getProfile
);

router.patch(
    "/change-password",
    protect,
    validateRequest(
        changePasswordSchema
    ),
    changePassword
);

router.get(
    "/users",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    getUsers
);

router.patch(
    "/users/:id/role",
    protect,
    authorize("admin"),
    updateRole
);

module.exports =
    router;