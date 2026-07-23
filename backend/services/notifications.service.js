import Notification from "../models/Notification.js";

export const getNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });
};

export const createNotification = async ({
  user,
  title,
  message,
  type = "info",
}) => {
  return await Notification.create({
    user,
    title,
    message,
    type,
  });
};

export const markAsRead = async (id, userId) => {
  return await Notification.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    {
      read: true,
    },
    {
      new: true,
    }
  );
};

export const deleteNotification = async (id, userId) => {
  return await Notification.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

export const deleteAllNotifications = async (userId) => {
  return await Notification.deleteMany({
    user: userId,
  });
};