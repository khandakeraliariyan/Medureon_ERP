const express =
    require("express");

const router =
    express.Router();

const protect =
    require("../../middleware/authMiddleware");

const authorize =
    require("../../middleware/roleMiddleware");

const validateRequest =
    require("../../middleware/validateRequest");

const controller =
    require("./batch.controller");

const {
    createBatchSchema
} =
    require(
        "./batch.validation"
    );

router.post(
    "/",
    protect,
    authorize(
        "admin",
        "manager",
        "inventory"
    ),
    validateRequest(
        createBatchSchema
    ),
    controller.createBatch
);

router.get(
    "/",
    protect,
    controller.getBatches
);

router.get(
    "/:id",
    protect,
    controller.getBatchById
);

router.patch(
    "/:id",
    protect,
    authorize(
        "admin",
        "manager"
    ),
    controller.updateBatch
);

router.delete(
    "/:id",
    protect,
    authorize(
        "admin"
    ),
    controller.deleteBatch
);

module.exports = router;