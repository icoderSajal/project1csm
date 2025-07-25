import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDB connect ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDb Server Issue ${error}`);
    }
};

export default connectDB;
