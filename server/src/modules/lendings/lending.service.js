const mongoose =
    require("mongoose");

const Lending =
    require("./lending.model");

const LendingPayment =
    require(
        "./lendingPayment.model"
    );

const Customer =
    require(
        "../customers/customer.model"
    );

const createLending =
    async (
        payload,
        userId
    ) => {

        const lending =
            await Lending.create({
                ...payload,

                dueAmount:
                    payload.originalAmount,

                createdBy:
                    userId,
            });

        await Customer.findByIdAndUpdate(
            payload.customer,
            {
                $inc: {
                    dueBalance:
                        payload.originalAmount,
                },
            }
        );

        return lending;
    };

const payInstallment =
    async (
        lendingId,
        payload,
        userId
    ) => {

        const session =
            await mongoose.startSession();

        session.startTransaction();

        try {

            const lending =
                await Lending.findById(
                    lendingId
                );

            if (!lending) {
                throw new Error(
                    "Lending not found"
                );
            }

            if (
                payload.amount >
                lending.dueAmount
            ) {
                throw new Error(
                    "Amount exceeds due"
                );
            }

            lending.paidAmount +=
                payload.amount;

            lending.dueAmount -=
                payload.amount;

            if (
                lending.dueAmount === 0
            ) {
                lending.status =
                    "paid";
            }

            await lending.save({
                session,
            });

            await LendingPayment.create(
                [{
                    lending:
                        lendingId,

                    amount:
                        payload.amount,

                    paymentMethod:
                        payload.paymentMethod,

                    note:
                        payload.note,

                    receivedBy:
                        userId,
                }],
                { session }
            );

            await Customer.findByIdAndUpdate(
                lending.customer,
                {
                    $inc: {
                        dueBalance:
                            -payload.amount,
                    },
                },
                { session }
            );

            await session.commitTransaction();

            return lending;

        } catch (error) {

            await session.abortTransaction();

            throw error;

        } finally {

            session.endSession();

        }
    };

const getLendings =
    async (
        page,
        limit
    ) => {

        const lendings =
            await Lending.find()
                .populate("customer")
                .populate(
                    "createdBy",
                    "name role"
                )
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Lending.countDocuments();

        return {
            lendings,
            total,
            page,
            limit,
        };
    };

const getLendingById =
    async (id) => {

        const lending =
            await Lending.findById(id)
                .populate("customer");

        const payments =
            await LendingPayment.find({
                lending: id,
            });

        return {
            lending,
            payments,
        };
    };

module.exports = {
    createLending,
    payInstallment,
    getLendings,
    getLendingById,
};