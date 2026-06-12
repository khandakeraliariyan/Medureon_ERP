const lendingService =
    require("./lending.service");

const createLending =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await lendingService
                    .createLending(
                        req.body,
                        req.user._id
                    );

            res.status(201).json({
                success: true,
                message:
                    "Lending created successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }

    };

const payInstallment =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await lendingService
                    .payInstallment(
                        req.params.id,
                        req.body,
                        req.user._id
                    );

            res.status(200).json({
                success: true,
                message:
                    "Installment paid successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }

    };

const getLendings =
    async (
        req,
        res,
        next
    ) => {

        try {

            const page =
                Number(
                    req.query.page
                ) || 1;

            const limit =
                Number(
                    req.query.limit
                ) || 10;

            const result =
                await lendingService
                    .getLendings(
                        page,
                        limit
                    );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }

    };

const getLendingById =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await lendingService
                    .getLendingById(
                        req.params.id
                    );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }

    };

module.exports = {
    createLending,
    payInstallment,
    getLendings,
    getLendingById,
};