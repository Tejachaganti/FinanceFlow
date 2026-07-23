import express from "express";
import {
  getAllNotifications,
  addNotification,
  readNotification,
  removeNotification,
  removeAllNotifications,
} from "../controllers/notifications.controller.js";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// All routes require authentication
router.use(protect);

// GET all notifications
router.get("/", getAllNotifications);

// Create notification
router.post("/", addNotification);

// Mark notification as read
router.patch("/:id/read", readNotification);

// Delete one notification
router.delete("/:id", removeNotification);

// Delete all notifications
router.delete("/", removeAllNotifications);

export default router;