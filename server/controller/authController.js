import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Create a new user with the uploaded image URL
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(301)
        .json({ success: false, message: "User Already Exist Please Login" });
    }
    const hasePassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hasePassword,
      role: role,
    });

    // Save the user to the database
    await newUser.save();

    // // Remove the image from the local directory after uploading to Cloudinary
    // fs.unlinkSync(imagePath);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "Error during registration" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    ///console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Account not found. Please register.",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Return success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle error
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verify = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { Register, Login, Logout, verify };
