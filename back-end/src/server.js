import dotenv from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import songRouter from "./routes/songs.route.js";
import userRouter from "./routes/user.route.js";
import albumRouter from "./routes/album.route.js";
import { mongoDb } from "./lib/mongoDb.js";
import { errorHandler } from "./middleware/error.middleware.js";
import stateRouter from "./routes/state.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/song", songRouter);
app.use("/api/user", userRouter);
app.use("/api/stat", stateRouter);
app.use("/api/album", albumRouter);
app.use(errorHandler);

await mongoDb();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
