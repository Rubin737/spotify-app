import { Router } from "express";
import { getAllUsers } from "../controller/user.controller.js";

const userRouter=Router();

userRouter.get('/get-all-users',getAllUsers)
export default userRouter;