const uploadService =
    require(
        "./upload.service"
    );

const uploadFile =
    async (
        req,
        res,
        next
    ) => {

        try {

            if (!req.file) {

                return res.status(400)
                    .json({
                        success: false,
                        message:
                            "No file uploaded",
                    });
            }

            const result =
                await uploadService
                    .uploadSingleFile(
                        req.file
                    );

            res.status(201).json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const deleteFile =
    async (
        req,
        res,
        next
    ) => {

        try {

            await uploadService
                .deleteFile(
                    req.params.publicId
                );

            res.json({
                success: true,
                message:
                    "File deleted",
            });

        } catch (err) {
            next(err);
        }

    };

module.exports = {
    uploadFile,
    deleteFile,
};