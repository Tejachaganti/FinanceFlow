import {
  Receipt,
  BarChart3,
  PiggyBank,
  User,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Expense",
    subtitle: "Record a new transaction",
    icon: Receipt,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
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
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Shortcuts
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-400">
            Jump to the most frequently used features.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

          <Zap
            size={28}
            className="text-white"
          />

        </div>

      </div>

      {/* Action Cards */}

      <div className="space-y-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex items-center justify-between rounded-3xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10"
            >

              <div className="flex items-center gap-5">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.bg}`}
                >
                  <Icon
                    size={24}
                    className={action.color}
                  />
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {action.subtitle}
                  </p>

                </div>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">

                <ChevronRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </div>

            </Link>
          );
        })}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">

        <p className="text-sm text-cyan-300">
          💡 Tip: Keep your expenses updated regularly to receive more accurate AI insights and budget recommendations.
        </p>

      </div>

    </section>
  );
};

export default QuickActions;