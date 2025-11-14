// routes\taskRoutes.js

import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
// Protect all task routes
router.use(protect);
// Create a new task
router.post("/", createTask);
// Get all tasks for the authenticated user
router.get("/", getTasks);
// Get a specific task by ID
router.get("/:id", getTaskById);
// Update a specific task by ID
router.put("/:id", updateTask);
// Delete a specific task by ID
router.delete("/:id", deleteTask);
export default router;
