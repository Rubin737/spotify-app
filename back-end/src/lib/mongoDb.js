import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const mongoDb = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("MongoDB is connected!", connect.connection.host);
  } catch (error) {
    console.log(`Cannot connect MongoDB.." ${error.message}`);
    process.exit(1);
  }
};
