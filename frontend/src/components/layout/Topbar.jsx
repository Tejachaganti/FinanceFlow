import {
  Bell,
  LogOut,
  Moon,
  Search,
  Sun,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Topbar = () => {
  const { user, logout, setUser, applyTheme } = useAuth();

  const toggleTheme = async () => {
    const currentTheme = user?.theme || "dark";
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    setUser((prev) => ({ ...prev, theme: nextTheme }));
    applyTheme(nextTheme);

    try {
      await api.put("/profile", { theme: nextTheme });
    } catch (error) {
      setUser((prev) => ({ ...prev, theme: currentTheme }));
      applyTheme(currentTheme);
      toast.error(error?.response?.data?.message || "Unable to update theme");
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 shadow-xl">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}

        <div>

          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            {today}
          </p>

        </div>

        {/* Search */}

        <div className="flex-1 lg:max-w-xl">

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            onClick={toggleTheme}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
          >
            {user?.theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">

            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </button>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:block">

            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-xs text-slate-400">
              {user?.email}
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <button
            onClick={logout}
            className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>

      {/* AI Banner */}

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 px-4 py-3">

        <Sparkles
          size={20}
          className="text-cyan-300"
        />

        <p className="text-sm text-slate-200">
          AI Recommendation:
          <span className="font-semibold text-white">
            {" "}
            You can save approximately ₹2,300 this month by reducing food and shopping expenses.
          </span>
        </p>

      </div>

    </header>
  );
};

export default Topbar;