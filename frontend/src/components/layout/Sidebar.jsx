import { BarChart3, LayoutDashboard, PiggyBank, ReceiptText, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Expenses", to: "/app/expenses", icon: ReceiptText },
  { label: "Analytics", to: "/app/analytics", icon: BarChart3 },
  { label: "Budget", to: "/app/budget", icon: PiggyBank },
  { label: "Settings", to: "/app/settings", icon: Settings }
];

const Sidebar = () => (
  <aside className="glass-card flex h-full flex-col p-5">
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">FinanceFlow</p>
      <h2 className="mt-3 font-display text-2xl font-bold text-white">AI Finance OS</h2>
      <p className="mt-2 text-sm text-slate-300">Professional money management with live analytics and smart guidance.</p>
    </div>
    <nav className="mt-8 space-y-2">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${isActive ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
    <div className="mt-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-4 text-sm text-slate-100">
      <p className="font-semibold">Monthly focus</p>
      <p className="mt-2 text-slate-200">Cut variable spending, grow savings goals, and watch category trends weekly.</p>
    </div>
  </aside>
);

export default Sidebar;
