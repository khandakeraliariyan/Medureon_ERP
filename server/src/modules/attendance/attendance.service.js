const Attendance =
    require("./attendance.model");

const Employee =
    require(
        "../employees/employee.model"
    );

const checkIn =
    async (
        employeeId
    ) => {

        const today =
            new Date();

        today.setHours(
            0, 0, 0, 0
        );

        const existing =
            await Attendance.findOne({
                employee:
                    employeeId,

                date: today,
            });

        if (existing) {
            throw new Error(
                "Already checked in"
            );
        }

        return await Attendance.create({
            employee:
                employeeId,

            date: today,

            checkIn:
                new Date(),

            status:
                "present",
        });
    };

const checkOut =
    async (
        employeeId
    ) => {

        const today =
            new Date();

        today.setHours(
            0, 0, 0, 0
        );

        const attendance =
            await Attendance.findOne({
                employee:
                    employeeId,

                date:
                    today,
            });

        if (!attendance) {
            throw new Error(
                "Check-in required"
            );
        }

        if (
            attendance.checkOut
        ) {
            throw new Error(
                "Already checked out"
            );
        }

        attendance.checkOut =
            new Date();

        attendance.workingHours =
            (
                attendance.checkOut -
                attendance.checkIn
            ) / 1000 / 60 / 60;

        await attendance.save();

        return attendance;
    };

const getAttendance =
    async (
        page,
        limit
    ) => {

        const data =
            await Attendance.find()
                .populate(
                    "employee"
                )
                .sort({
                    date: -1,
                })
                .skip(
                    (page - 1) * limit
                )
                .limit(limit);

        const total =
            await Attendance.countDocuments();

        return {
            data,
            total,
            page,
            limit,
        };
    };

const getEmployeeAttendance =
    async (
        employeeId
    ) => {

        return await Attendance.find({
            employee:
                employeeId,
        })
            .sort({
                date: -1,
            });

    };

module.exports = {
    checkIn,
    checkOut,
    getAttendance,
    getEmployeeAttendance,
};