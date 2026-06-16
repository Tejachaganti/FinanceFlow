import { Bell, LogOut, Moon, Search, Sun } from "lucide-react";
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

  return (
    <header className="glass-card flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-400">
        <Search size={16} />
        Search insights, budgets, and transactions
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={toggleTheme} className="btn-secondary">
          {user?.theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button type="button" className="btn-secondary">
          <Bell size={16} />
        </button>
        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm">
          <p className="font-semibold text-white">{user?.name}</p>
          <p className="text-slate-400">{user?.email}</p>
        </div>
        <button type="button" onClick={logout} className="btn-secondary">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
