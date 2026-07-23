import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../services/notifications.service.js";

// GET /api/notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications(req.user.id);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications.",
    });
  }
};

// POST /api/notifications
export const addNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required.",
      });
    }

    const notification = await createNotification({
      user: req.user.id,
      title,
      message,
      type,
    });

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification.",
    });
  }
};

// PATCH /api/notifications/:id/read
export const readNotification = async (req, res) => {
  try {
    const notification = await markAsRead(
      req.params.id,
      req.user.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification.",
    });
  }
};

// DELETE /api/notifications/:id
export const removeNotification = async (req, res) => {
  try {
    const notification = await deleteNotification(
      req.params.id,
      req.user.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification.",
    });
  }
};

// DELETE /api/notifications
export const removeAllNotifications = async (req, res) => {
  try {
    await deleteAllNotifications(req.user.id);

    res.status(200).json({
      success: true,
      message: "All notifications deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notifications.",
    });
  }
};