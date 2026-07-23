import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export const AuthContext = createContext(null);
const THEME_KEY = "financeflow_theme";

const getErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyTheme = (theme) => {
  let resolvedTheme = theme;

  if (theme === "system") {
    resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolvedTheme);

  localStorage.setItem(THEME_KEY, theme);
};
  const persistSession = async () => {
    const token = localStorage.getItem("financeflow_token");
   const storedTheme = localStorage.getItem(THEME_KEY) || "dark";
applyTheme(storedTheme);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      applyTheme(data.user.theme || localStorage.getItem(THEME_KEY) || "dark");
    } catch (_error) {
      localStorage.removeItem("financeflow_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    persistSession();
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      toast.error("Your session has expired. Please sign in again.");
    };
    window.addEventListener("financeflow:session-expired", handleSessionExpired);
    return () => window.removeEventListener("financeflow:session-expired", handleSessionExpired);
  }, []);

  const login = async (values) => {
    try {
      const { data } = await api.post("/auth/login", values);
      localStorage.setItem("financeflow_token", data.token);
      setUser(data.user);
      applyTheme(data.user.theme || "dark");
      toast.success(`Welcome back, ${data.user.name}`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to sign in"));
      return false;
    }
  };

  const register = async (values) => {
    try {
      const { data } = await api.post("/auth/register", values);
      localStorage.setItem("financeflow_token", data.token);
      setUser(data.user);
      applyTheme(data.user.theme || "dark");
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to create account"));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("financeflow_token");
    localStorage.removeItem("financeflow_recent_searches");
    setUser(null);
    toast.success("Signed out");
  };

  const value = useMemo(() => ({ user, setUser, loading, login, register, logout, applyTheme }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
