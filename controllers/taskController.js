// controllers\taskController.js

import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const newTask = new Task({
      userId: req.user._id,
      title,
      description,
      status,
      dueDate,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

// Get all tasks for the authenticated user
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
// Get a specific task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update a specific task by ID
export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete a specific task by ID
export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
