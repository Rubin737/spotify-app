import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const mongoDb = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    const connect = await mongoose.connect(MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
};
