import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
  const totalSalary =
    parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
  const newSalary = new Salary({
    employeeId,
    basicSalary,
    allowances,
    deductions,
    netSalary: totalSalary,
    payDate,
  });

  await newSalary.save();
  return res.status(200).json({ success: true });

  //res.status(200).json({ success: true, message: "Error" });
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary;
    salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({ success: true, salaries: salary });
  } catch (error) {
    //console.error("Error fetching salary:", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const allEmployeSalaries = async (req, res) => {
  try {
    let salary;
    salary = await Salary.find().populate("employeeId", "employeeId");
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({ success: true, salaries: salary });
  } catch (error) {
    //console.error("Error fetching salary:", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { addSalary, getSalary, allEmployeSalaries };
