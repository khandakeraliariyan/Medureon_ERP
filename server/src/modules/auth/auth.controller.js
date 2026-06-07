const authService =
    require("./auth.service");

const register =
    async (
        req,
        res,
        next
    ) => {
        try {

            const result =
                await authService
                    .registerUser(
                        req.body
                    );

            res.status(201).json({
                success: true,
                message:
                    "User registered successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const login =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                email,
                password,
            } = req.body;

            const result =
                await authService
                    .loginUser(
                        email,
                        password
                    );

            res.json({
                success: true,
                message:
                    "Login successful",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

const getProfile =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await authService.getMe(
                    req.user._id
                );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const changePassword =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                oldPassword,
                newPassword,
            } = req.body;

            await authService
                .changePassword(
                    req.user._id,
                    oldPassword,
                    newPassword
                );

            res.json({
                success: true,
                message:
                    "Password updated",
            });

        } catch (err) {
            next(err);
        }

    };

const getUsers =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await authService
                    .getAllUsers();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const updateRole =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await authService
                    .updateRole(
                        req.params.id,
                        req.body.role
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    register,
    login,
    getProfile,
    changePassword,
    getUsers,
    updateRole
};