const express =
    require("express");

const router =
    express.Router();

const validateRequest =
    require("../../middleware/validateRequest");

const {
    registerSchema,
    loginSchema,
} =
    require("./auth.validation");

const {
    register,
    login,
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

module.exports =
    router;