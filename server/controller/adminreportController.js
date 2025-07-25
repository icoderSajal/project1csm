import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
const showReports = async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.body;

    // Validate required fields
    if (!reportType || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the full end date

    let reportData;
    reportData = await Attendance.find({
      loginTime: { $gte: start, $lte: end },
    });

    // switch (reportType) {
    //   case "Attendance Report":
    //     reportData = await Attendance.find({
    //       loginTime: { $gte: start, $lte: end },
    //     }).sort({ loginTime: 1 });
    //     break;

    //   case "Leave Report":
    //     reportData = await Leave.find({
    //       startDate: { $lte: end },
    //       endDate: { $gte: start },
    //     }).sort({ startDate: 1 });
    //     break;

    //   default:
    //     return res.status(400).json({ error: "Invalid report type provided." });
    // }
    // console.log(reportData);
    return res.status(200).json({ success: true, reportData });
  } catch (err) {
    console.error("Error generating report:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
const getSata = async (req, res) => {
  try {
    const atts = await Attendance.find();
    return res.status(200).json({ success: true, atts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export { showReports, getSata };
