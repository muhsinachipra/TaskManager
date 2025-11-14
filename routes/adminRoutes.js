// routes\adminRoutes.js

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  getAllTasks,
  editTask,
  deleteTask,
} from "../controllers/adminController.js";

const router = express.Router();
// Protect all admin routes
router.use(protect);
router.use(admin);
// Get all users
router.get("/users", getAllUsers);
// Delete a specific user by ID
router.delete("/users/:id", deleteUser);
// get all tasks
router.get("/tasks", getAllTasks);
// edit tasks
router.put("/tasks/:id", editTask);
// delete tasks
router.delete("/tasks/:id", deleteTask);

export default router;
