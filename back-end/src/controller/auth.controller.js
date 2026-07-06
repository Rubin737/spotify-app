import User from "../model/user.model.js";
import { getAuth } from "@clerk/express";
export const authentication = async (req, res, next) => {
  
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const existingUser = await User.findOne({ clerkId: userId });
    const { fullName, imageUrl } = req.body; 
    if (!existingUser) {
      const createUser = await User.create({
        clerkId: userId,
        fullName,
        imageUrl,
      });
    }
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
