import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyuser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token not Found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token not Valid" });
        }
        const user = await User.findById({ _id: decoded._id }).select("-password");
        if (!user) {
            res.status(404).json({ success: false, error: "User not Found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(404)
            .json({ success: false, message: "Internal server Error" });
    }
};
export default verifyuser;
