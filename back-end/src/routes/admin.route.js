import { Router } from "express";
import {requireAdmin } from "../middleware/auth.middleware.js";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
const adminRouter = Router();
adminRouter.use(requireAdmin);
adminRouter.get("/check-admin", checkAdmin);
adminRouter.post("/create-song", createSong);
adminRouter.delete("/delete-song/:id", deleteSong);
adminRouter.post("/create-album", createAlbum);
adminRouter.delete("/delete-album/:id", deleteAlbum);

export default adminRouter;
