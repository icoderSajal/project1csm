// import Department from "../models/Department.js";
// import Employee from "../models/Employee.js";
// import Leave from "../models/Leave.js";

// const getSummary = async (req, res) => {
//   try {
//     const totalEmployees = await Employee.countDocuments();
//     const totalDepartments = await Department.countDocuments();

//     const totalSalaries = await Employee.aggregate([
//       { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
//     ]);

//     const employeeAppliedForLeave = await Leave.distinct("employeeId");

//     const leaveStatus = await Leave.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const leaveSummary = {
//       appliedFor: employeeAppliedForLeave.length,
//       approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
//       rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
//       pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
//     };

//     // 🔹 Group leaves by month (format: YYYY-MM)
//     const monthlyLeaveCounts = await Leave.aggregate([
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m", date: "$startDate" }, // Assuming 'startDate' is the leave start
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 }, // Sort chronologically
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       totalEmployees,
//       totalDepartments,
//       totalSalary: totalSalaries[0]?.totalSalary || 0,
//       leaveSummary,
//       monthlyLeaveCounts, // ← New field added to response
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal Server Error" });
//   }
// };

// const countEmployeesByDepartment = async (req, res) => {
//   try {
//     const result = await Employee.aggregate([
//       {
//         $group: {
//           _id: "$department",
//           employeeCount: { $sum: 1 },
//         },
//       },
//       {
//         $lookup: {
//           from: "departments", // this should match your collection name in MongoDB
//           localField: "_id",
//           foreignField: "_id",
//           as: "departmentDetails",
//         },
//       },
//       {
//         $unwind: "$departmentDetails",
//       },
//       {
//         $project: {
//           _id: 0,
//           departmentId: "$_id",
//           departmentName: "$departmentDetails.dep_name",
//           employeeCount: 1,
//         },
//       },
//     ]);

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// const getallTasks = () => {
//   try {
//   } catch (error) {}
// };
// export { getSummary, countEmployeesByDepartment, getallTasks };
