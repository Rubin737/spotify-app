import dotenv from "dotenv";
dotenv.config();

console.log("✅ Step 1: dotenv loaded");

import express from "express";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
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

try {
  console.log("✅ Step 2: Creating Express app");

  const MODE = process.env.NODE_ENV;
  const PORT = process.env.PORT || 5000;
  const __dirname = path.resolve();

  const app = express();
  const httpServer = createServer(app);

  console.log("✅ Step 3: Initializing Socket.IO");
  initializeSocket(httpServer);

  console.log("✅ Step 4: Configuring middleware");

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

  const tempDir = path.join(process.cwd(), "tmp");

  cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
      fs.readdir(tempDir, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }

        for (const file of files) {
          fs.unlink(path.join(tempDir, file), () => {});
        }
      });
    }
  });

  console.log("✅ Step 5: Registering routes");

  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/song", songRouter);
  app.use("/api/user", userRouter);
  app.use("/api/stat", stateRouter);
  app.use("/api/album", albumRouter);

  app.use(errorHandler);

  if (MODE === "production") {
    console.log("✅ Step 6: Serving frontend");

    app.use(express.static(path.join(__dirname, "../front-end/dist")));

    app.get("/*splat", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../front-end/dist/index.html"));
    });
  }

  console.log("✅ Step 7: Connecting MongoDB");
  await mongoDb();

  console.log("✅ Step 8: Starting server");

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (err) {
  console.error("❌ SERVER STARTUP FAILED");
  console.error(err);
  process.exit(1);
}
