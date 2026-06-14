const attendanceService =
    require(
        "./attendance.service"
    );

const checkIn =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await attendanceService
                    .checkIn(
                        req.body.employee
                    );

            res.status(201).json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const checkOut =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await attendanceService
                    .checkOut(
                        req.body.employee
                    );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getAttendance =
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
                ) || 20;

            const result =
                await attendanceService
                    .getAttendance(
                        page,
                        limit
                    );

            res.json({
                success: true,
                data: result,
            });

        } catch (err) {
            next(err);
        }

    };

const getEmployeeAttendance =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await attendanceService
                    .getEmployeeAttendance(
                        req.params.employeeId
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
    checkIn,
    checkOut,
    getAttendance,
    getEmployeeAttendance,
};