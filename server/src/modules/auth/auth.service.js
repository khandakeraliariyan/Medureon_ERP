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

module.exports = {
    registerUser,
    loginUser,
};