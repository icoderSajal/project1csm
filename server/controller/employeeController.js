import User from "../models/User.js";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";
import randomstring from "randomstring";
import { sendMail } from "../helpers/mailer.js"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const password = randomstring.generate(6);
const addemployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,

      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already register" });
    }
    console.log(`the passwrd is ${password}`)
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    //voyager password- Uc5y7e;
    //Manager password- LVOWd2;
    //head cook -ClFg9O;
    //supervisor -oPyTEn


    const savedUser = await newUser.save();
    console.log(password);
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    const userData = await newEmployee.save();

    const content = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2a9d8f;">Welcome to Cruise Ship Management, ${savedUser.name}!</h2>
    <p>We're excited to have you onboard. Your account has been successfully created. Please find your login credentials below:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Name:</td>
        <td style="padding: 8px;">${savedUser.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">${savedUser.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Password:</td>
        <td style="padding: 8px;">${password}</td>
      </tr>
    </table>

    <p style="margin-top: 20px;">You can now <a href="https://your-login-url.com" style="color: #2a9d8f; text-decoration: none;"><b>login</b></a> using the credentials above.</p>
    
    <p>Thanks,<br/>Cruise Ship Management Team</p>
  </div>
`;

    await sendMail(savedUser.email, "Account Created", content);


    return res
      .status(201)
      .json({ success: true, message: "Employee Created!!!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: true, error });
  }
};

const getallemployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not Found" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not Found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        department,
        salary,
      }
    );
    if (!updateUser || !updateEmployee) {
      return res
        .status(404)
        .json({ success: false, error: "document not Found" });
    }

    return res.status(200).json({ success: true, message: "employee updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getEmployeeByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error to get employees",
    });
  }
};
export {
  addemployee,
  upload,
  getallemployees,
  getEmployee,
  updateEmployee,
  getEmployeeByDepId,
};
