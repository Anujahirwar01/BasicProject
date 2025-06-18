import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
    mongoose.connect(process.env.MONGO_URl)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
}

export default connectDB;