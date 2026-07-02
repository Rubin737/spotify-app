import { Router } from "express";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { getAllStats } from "../controller/state.controller.js";

const stateRouter = Router();
stateRouter.get("/get-stats", requireAdmin, getAllStats);

export default stateRouter;
