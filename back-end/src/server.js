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
import { createServer } from "http";
import { initializeSocket } from "./lib/socketio.js";
import cron from "node-cron";
import fs from "fs";

dotenv.config();

const MODE = process.env.NODE_ENV;
const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

const PORT = process.env.PORT || 5000;
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

// const tempDir = path.join(process.cwd(), "tmp");
// cron.schedule("0 * * * *", () => {
//   if (fs.existsSync(tempDir)) {
//     fs.readdir(tempDir, (err, files) => {
//       if (err) {
//         console.log("error", err);
//         return;
//       }
//       for (const file of files) {
//         fs.unlink(path.join(tempDir, file), (err) => {});
//       }
//     });
//   }
// });

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/song", songRouter);
app.use("/api/user", userRouter);
app.use("/api/stat", stateRouter);
app.use("/api/album", albumRouter);
app.use(errorHandler);

// if (MODE === "production") {
//   app.use(express.static(path.join(__dirname, "../front-end/dist")));
//   app.get("/*splat", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../front-end/dist/index.html"));
//   });
// }

await mongoDb();
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
