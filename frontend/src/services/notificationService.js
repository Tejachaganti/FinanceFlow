import api from "./api";

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

export const markNotificationAsRead = async (id) => {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data;
};

export const deleteNotification = async (id) => {
  const { data } = await api.delete(`/notifications/${id}`);
  return data;
};

export const clearAllNotifications = async () => {
  const { data } = await api.delete("/notifications");
  return data;
};

export const createNotification = async (notification) => {
  const { data } = await api.post("/notifications", notification);
  return data;
};