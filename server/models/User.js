import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "voyager", "manager", "headcook", "supervisor"],
        required: true,
        default: "supervisor"
    },
    profileImage: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});



const User = mongoose.model("User", UserSchema);

export default User;
