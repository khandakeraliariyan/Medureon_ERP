const bcrypt =
    require("bcryptjs");

const User =
    require("./auth.model");

const generateToken =
    require("../../utils/generateToken");

const registerUser =
    async (payload) => {

        const existingUser =
            await User.findOne({
                email:
                    payload.email,
            });

        if (existingUser) {
            throw new Error(
                "Email already exists"
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                payload.password,
                10
            );

        const user =
            await User.create({
                ...payload,
                password:
                    hashedPassword,
            });

        const token =
            generateToken(user._id);

        return {
            token,
            user,
        };
    };

const loginUser =
    async (
        email,
        password
    ) => {

        const user =
            await User.findOne({
                email,
            }).select("+password");

        if (!user) {
            throw new Error(
                "Invalid credentials"
            );
        }

        const matched =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!matched) {
            throw new Error(
                "Invalid credentials"
            );
        }

        user.lastLogin =
            new Date();

        await user.save();

        const token =
            generateToken(user._id);

        return {
            token,
            user,
        };
    };

const getMe =
    async (userId) => {

        return await User.findById(
            userId
        ).select("-password");

    };

const changePassword =
    async (
        userId,
        oldPassword,
        newPassword
    ) => {

        const user =
            await User.findById(
                userId
            ).select("+password");

        const matched =
            await bcrypt.compare(
                oldPassword,
                user.password
            );

        if (!matched) {
            throw new Error(
                "Wrong password"
            );
        }

        user.password =
            await bcrypt.hash(
                newPassword,
                10
            );

        await user.save();

        return true;
    };

const updateProfile =
    async (
        userId,
        payload
    ) => {

        return await User.findByIdAndUpdate(
            userId,
            payload,
            {
                new: true,
            }
        );
    };

const getAllUsers =
    async () => {

        return await User.find()
            .select("-password")
            .sort({
                createdAt: -1,
            });

    };

const updateRole =
    async (
        userId,
        role
    ) => {

        return await User.findByIdAndUpdate(
            userId,
            {
                role,
            },
            {
                new: true,
            }
        );
    };

module.exports = {
    registerUser,
    loginUser,
    getMe,
    changePassword,
    updateProfile,
    getAllUsers,
    updateRole
};