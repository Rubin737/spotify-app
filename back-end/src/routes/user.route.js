import { Router } from "express";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const userRouter=Router();

// userRouter.use(requireAdmin)
userRouter.get("/get-all-users",getAllUsers)
userRouter.get("/message/:userId",getMessages)
export default userRouter;