import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // required so the browser sends the refresh cookie
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());

app.get("/api/health", (req, res) => res.json({ success: true, status: "ok" }));
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
