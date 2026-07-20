import {
  BarChart3,
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  Settings,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  {
    label: "Dashboard",
    to: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Expenses",
    to: "/app/expenses",
    icon: ReceiptText,
  },
  {
    label: "Analytics",
    to: "/app/analytics",
    icon: BarChart3,
  },
  {
    label: "Budget",
    to: "/app/budget",
    icon: PiggyBank,
  },
  {
    label: "Settings",
    to: "/app/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <aside className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 shadow-2xl">

      {/* Logo */}

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">

            <Sparkles className="text-white" size={24} />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              FinanceFlow
            </p>

            <h2 className="text-2xl font-bold text-white">
              AI Finance
            </h2>

          </div>

        </div>

        <p className="mt-5 text-sm leading-6 text-slate-400">
          Smart money management with AI insights, budgeting and analytics.
        </p>

      </div>

      {/* Navigation */}

      <nav className="mt-10 space-y-3">

        {items.map(({ label, to, icon: Icon }, index) => (

          <motion.div
            key={label}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
          >

            <NavLink
              to={to}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span className="font-medium">
                  {label}
                </span>

              </div>

              <ChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />

            </NavLink>

          </motion.div>

        ))}

      </nav>

      {/* Bottom Card */}

      <div className="mt-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-blue-500/20 p-5">

        <p className="font-semibold text-white">
          Financial Goal
        </p>

        <p className="mt-2 text-sm text-slate-300">
          Save ₹25,000 this month by keeping your expenses under budget.
        </p>

        <div className="mt-5">

          <div className="mb-2 flex justify-between text-xs text-slate-300">
            <span>Progress</span>
            <span>72%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">

            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />

          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;