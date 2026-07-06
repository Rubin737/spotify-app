import dotenv from "dotenv";
import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";

dotenv.config();

export const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const currentUser = await clerkClient.users.getUser(userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.emailAddresses[0].emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({
          success: false,
          data: null,
          message: "Unauthorized User - you must be an Admin",
        });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Auth check failed" });
  } 
};