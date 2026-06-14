const cloudinary =
    require(
        "../../config/cloudinary"
    );

const uploadSingleFile =
    async (
        file
    ) => {

        return {
            url:
                file.path,

            publicId:
                file.filename,
        };

    };

const deleteFile =
    async (
        publicId
    ) => {

        return await cloudinary
            .uploader.destroy(
                publicId
            );

    };

module.exports = {
    uploadSingleFile,
    deleteFile,
};