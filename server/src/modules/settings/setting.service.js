const Setting =
    require("./setting.model");

const getSettings =
    async () => {

        let settings =
            await Setting.findOne();

        if (!settings) {
            settings =
                await Setting.create({});
        }

        return settings;
    };

const updateSettings =
    async (payload) => {

        let settings =
            await Setting.findOne();

        if (!settings) {
            settings =
                await Setting.create({});
        }

        Object.assign(
            settings,
            payload
        );

        await settings.save();

        return settings;
    };

module.exports = {
    getSettings,
    updateSettings,
};