import { Router } from "express";
import { authentication } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/callback", authentication);
export default authRouter;
