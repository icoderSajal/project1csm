import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getByIdLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await Leave.find({ employeeId: id });
    if (!leaves || leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });

      leaves = await Leave.find({ employeeId: employee._id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const addLeaves = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({ success: true, leave: newLeave });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name" },
        { path: "department", select: "dep_name" },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getLeaveDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });
    console.log(leave);
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      res.status(500).json({ success: false, error: "leave not founded" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export { addLeaves, getByIdLeaves, getAllLeaves, getLeaveDetails, updateLeave };
