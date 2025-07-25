import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const addAttendance = async (req, res) => {
  try {
    const { userId, employeeId, name, loginTime, status } = req.body;

    const newAttendance = new Attendance({
      userId,
      employeeId,
      name,
      loginTime,
      status,
    });

    await newAttendance.save();

    res.status(201).json({ success: true, attendance: newAttendance });
  } catch (error) {
    console.error("Start Attendance Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to start attendance." });
  }
};

const endAttendance = async (req, res) => {
  try {
    const { logoutTime } = req.body;
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, error: "Attendance not found" });
    }

    attendance.logoutTime = logoutTime;

    const start = new Date(attendance.loginTime);
    const end = new Date(logoutTime);
    const diffInHours = (end - start) / (1000 * 60 * 60);

    attendance.hoursWorked = parseFloat(diffInHours.toFixed(2));

    await attendance.save();

    res.json({ success: true, attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Logout update failed" });
  }
};

const addManualAttendance = async (req, res) => {
  try {
    const { employeeId, name, loginTime, logoutTime, status, hoursWorked } =
      req.body;

    // Find the employee to get the userId (MongoDB ObjectId)
    const employee = await Employee.findOne({ employeeId }).populate("userId");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Construct attendance object
    const attendance = new Attendance({
      userId: employee.userId._id,
      employeeId,
      name,
      loginTime: new Date(loginTime), // Required even for Absent/Leave
      logoutTime: status === "Present" ? new Date(logoutTime) : null,
      hoursWorked: status === "Present" ? parseFloat(hoursWorked) : 0,
      status,
    });

    await attendance.save();

    res.status(201).json({ success: true, attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error saving attendance" });
  }
};
export { addAttendance, endAttendance, addManualAttendance };
