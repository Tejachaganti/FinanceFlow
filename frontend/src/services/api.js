import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://192.168.0.114:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("financeflow_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.includes("/auth/login") || error.config?.url?.includes("/auth/register");
    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("financeflow_token");
      window.dispatchEvent(new Event("financeflow:session-expired"));
    }
    return Promise.reject(error);
  }
);

export default api;
