import {
  Bell,
  Search,
  Sun,
  Sparkles,
  ChevronDown,
  Menu,
  Settings,
  LogOut,
  Check,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import GlobalSearchDialog from "../search/GlobalSearchDialog";

import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../../services/notificationService";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout, setUser, applyTheme } = useAuth();

  // ===========================
  // State
  // ===========================

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // ===========================
  // Helpers
  // ===========================

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // ===========================
  // Notifications
  // ===========================

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      loadNotifications();
    } catch {
      toast.error("Unable to mark notification as read");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      toast.success("Notification deleted");
      loadNotifications();
    } catch {
      toast.error("Unable to delete notification");
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllNotifications();
      toast.success("Notifications cleared");
      loadNotifications();
    } catch {
      toast.error("Unable to clear notifications");
    }
  };

  // ===========================
  // Theme
  // ===========================

  const setTheme = async (nextTheme) => {
    try {
      await api.put("/profile", {
        theme: nextTheme,
      });

      setUser((prev) => ({
        ...prev,
        theme: nextTheme,
      }));

      applyTheme(nextTheme);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update theme"
      );
    }
  };

  // ===========================
  // Effects
  // ===========================

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowGlobalSearch(true);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  return (
    <header
      className="rounded-3xl border shadow-xl backdrop-blur-xl transition-all duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

       <div className="flex items-center gap-4">
  <button
    onClick={() => setSidebarOpen(true)}
    className="rounded-xl border p-3 lg:hidden"
    style={{
      background: "var(--surface-2)",
      borderColor: "var(--border)",
    }}
  >
    <Menu size={20} />
  </button>

  <div>
    <h1
      className="text-2xl font-bold md:text-3xl"
      style={{ color: "var(--text)" }}
    >
      Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
    </h1>

    <p
      className="mt-2 text-sm"
      style={{ color: "var(--text-secondary)" }}
    >
      {today}
    </p>
  </div>
</div>
        {/* Search */}

        <div className="w-full lg:max-w-md xl:max-w-lg">

          <div
            className="flex items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-400/20"
            style={{
              background: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            <Search
              size={18}
              style={{
                color: "var(--text-secondary)",
              }}
            />

            <input
              type="text"
              placeholder="Search transactions..."
              onFocus={() => setShowGlobalSearch(true)}
              readOnly
              className="w-full bg-transparent outline-none"
              style={{
                color: "var(--text)",
              }}
            />
          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-end gap-2">

          {/* Notifications */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              aria-label="Open notifications" className="relative rounded-2xl border p-2.5 transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <Bell size={18} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown
                PART 2 STARTS HERE */}
                            {showNotifications && (
              <div
                className="absolute right-0 top-16 z-50 w-[92vw] max-w-sm md:w-96 overflow-hidden rounded-3xl border shadow-2xl"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Header */}

                <div
                  className="flex items-center justify-between border-b px-5 py-4"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/app/notifications");
                      setShowNotifications(false);
                    }}
                    className="text-lg font-semibold"
                    style={{
                      color: "var(--text)",
                    }}
                  >
                    Notifications
                  </button>

                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-sm font-medium text-red-400 transition hover:text-red-300"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Notification List */}

                <div className="max-h-96 overflow-y-auto">

                  {notifications.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-12">

                      <Bell
                        size={40}
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      />

                      <p
                        className="mt-4"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        No notifications available
                      </p>

                    </div>

                  ) : (

                    notifications.map((notification) => (

                      <div
                        key={notification._id}
                        className="border-b px-5 py-4 transition-all duration-300 hover:bg-cyan-500/5"
                        style={{
                          borderColor: "var(--border)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">

                          <div className="flex-1">

                            <div className="flex items-center gap-2">

                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                              )}

                              <h4
                                className="font-semibold"
                                style={{
                                  color: "var(--text)",
                                }}
                              >
                                {notification.title}
                              </h4>

                            </div>

                            <p
                              className="mt-2 text-sm leading-6"
                              style={{
                                color: "var(--text-secondary)",
                              }}
                            >
                              {notification.message}
                            </p>

                          </div>

                          <div className="flex flex-col gap-2">

                            {!notification.read && (

                              <button
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }
                                className="rounded-lg p-2 text-green-400 transition hover:bg-green-500/10"
                              >
                                <Check size={16} />
                              </button>

                            )}

                            <button
                              onClick={() =>
                                handleDelete(notification._id)
                              }
                              className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              </div>
            )}

          </div>

          {/* Profile */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
              }
              aria-expanded={showProfileMenu} aria-label="Open profile menu" className="flex items-center gap-2 rounded-2xl border px-2.5 py-2 transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--surface-2)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <ChevronDown
                size={16}
                style={{
                  color: "var(--text-secondary)",
                }}
              />
            </button>

            {/* PART 3 STARTS HERE */}
                        {showProfileMenu && (
              <div
               
               className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-[320px] overflow-hidden rounded-3xl border shadow-2xl"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                {/* User Info */}

                <div
                  className="border-b p-4"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "linear-gradient(135deg, rgba(6,182,212,.10), rgba(59,130,246,.10))",
                  }}
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3
                        className="truncate text-lg font-semibold"
                        style={{
                          color: "var(--text)",
                        }}
                      >
                        {user?.name || "User"}
                      </h3>

                      <p
                        className="truncate text-sm"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        {user?.email}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Menu */}
<div className="p-3">

  {/* Settings */}
  <button
    onClick={() => {
      navigate("/app/settings");
      setShowProfileMenu(false);
    }}
   className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-cyan-500/10 hover:text-cyan-400"
    style={{
      color: "var(--text-secondary)",
    }}
  >
    <Settings size={18} />
    <span>Settings</span>
  </button>

 

  {/* Logout */}
  <button
    onClick={() => {
  setShowProfileMenu(false);
  logout();
}}
    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500/10"
  >
    <LogOut size={18} />
    <span>Logout</span>
  </button>

</div>
                </div>
            )}

          </div>

        </div>

      </div>

      {/* AI Insight */}

      <div
        className="mt-6 rounded-3xl border p-5"
        style={{
          borderColor: "rgba(6,182,212,.25)",
          background:
            "linear-gradient(135deg, rgba(6,182,212,.10), rgba(59,130,246,.10), rgba(99,102,241,.10))",
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start">

          <div className="rounded-2xl bg-cyan-500/20 p-3">

            <Sparkles
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div className="flex-1">

            <h3
              className="text-lg font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              AI Financial Insight
            </h3>

            <p
              className="mt-2 text-sm leading-7"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Based on your recent spending patterns, you can save
              <span
                className="font-semibold"
                style={{
                  color: "var(--primary)",
                }}
              >
                {" "}
                ₹2,300{" "}
              </span>
              this month by reducing unnecessary food delivery and shopping
              expenses. Keep tracking your daily spending to improve your
              monthly savings.
            </p>

          </div>

        </div>

      </div>

      <GlobalSearchDialog open={showGlobalSearch} onClose={() => setShowGlobalSearch(false)} />

    </header>
  );
};

export default Topbar;
