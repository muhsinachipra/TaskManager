import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(errorHandler);
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

// user routes
app.use("/api/auth", authRoutes);
// task routes
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
