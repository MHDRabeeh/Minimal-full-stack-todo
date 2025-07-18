import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    completeTodo,
  createTodo,
  deleteTodo,
  editTodo,
  readTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", protect, readTodo);
router.post("/", protect, createTodo);
router.put("/:id", protect, editTodo);
router.delete("/:id", protect, deleteTodo);
router.patch('/:id/complete', protect, completeTodo); 
export default router;
