import {
  Receipt,
  BarChart3,
  PiggyBank,
  User,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Expense",
    subtitle: "Record a new transaction",
    icon: Receipt,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    to: "/app/expenses",
  },
  {
    title: "Analytics",
    subtitle: "View financial reports",
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    to: "/app/analytics",
  },
  {
    title: "Budget",
    subtitle: "Manage spending goals",
    icon: PiggyBank,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    to: "/app/budget",
  },
  {
    title: "Profile",
    subtitle: "Account settings",
    icon: User,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    to: "/app/settings",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#131D33] p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <span className="text-sm text-slate-500">
          Shortcuts
        </span>
      </div>

      <div className="space-y-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10"
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.bg}`}
                >
                  <Icon
                    className={action.color}
                    size={22}
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {action.subtitle}
                  </p>

                </div>

              </div>

              <ChevronRight
                className="text-slate-500 transition group-hover:translate-x-1"
                size={18}
              />

            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default QuickActions;