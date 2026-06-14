const settingService =
    require("./setting.service");

const getSettings =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await settingService
                    .getSettings();

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const updateSettings =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await settingService
                    .updateSettings(
                        req.body
                    );

            res.json({
                success: true,
                message:
                    "Settings updated",
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    getSettings,
    updateSettings,
};