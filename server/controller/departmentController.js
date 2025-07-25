import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({ dep_name, description });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const department = await Department.findByIdAndUpdate(
      { _id: id },
      { dep_name, description }
    );

    return res.status(200).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedep = await Department.findById({ _id: id });
    await deletedep.deleteOne();
    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export {
  addDepartment,
  getDepartments,
  editDepartment,
  updateDepartment,
  deleteDepartment,
};
