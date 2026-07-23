import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

const toneConfig = {
  info: {
    icon: <Info size={18} />,
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-300",
  },
  success: {
    icon: <CheckCircle2 size={18} />,
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-300",
  },
  warning: {
    icon: <TrendingUp size={18} />,
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-300",
  },
  danger: {
    icon: <AlertTriangle size={18} />,
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-300",
  },
};

const InsightsPanel = ({ insights = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-5 sm:p-6 lg:p-8">

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Artificial Intelligence
          </p>

          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            AI Financial Advisor
          </h2>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Smart recommendations based on your financial activity.
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 sm:h-16 sm:w-16">

          <Brain
            size={26}
            className="text-white"
          />

        </div>

      </div>
            {/* Empty State */}

      {!insights.length && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 px-6 py-12 sm:py-16">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 sm:h-16 sm:w-16">
            <Brain
              size={28}
              className="text-cyan-400"
            />
          </div>

          <h3 className="text-lg font-semibold text-white sm:text-xl">
            No AI Insights Yet
          </h3>

          <p className="mt-3 max-w-md text-center text-sm text-slate-400 sm:text-base">
            Add more financial activity to receive personalized AI recommendations.
          </p>

        </div>
      )}

      {/* Insights */}

      {!!insights.length && (
        <div className="space-y-4 sm:space-y-5">

          {insights.map((item) => {
            const config = toneConfig[item.tone] || toneConfig.info;

            return (
              <div
                key={item.title}
                className={`rounded-3xl border ${config.border} ${config.bg} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5`}
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${config.iconBg} ${config.iconColor} sm:h-12 sm:w-12`}
                  >
                    {config.icon}
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <h3 className="text-base font-semibold text-white sm:text-lg">
                        {item.title}
                      </h3>

                      <span className="w-fit rounded-full bg-slate-900/50 px-3 py-1 text-xs uppercase tracking-wider text-slate-400">
                        {item.tone || "info"}
                      </span>

                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
};

export default InsightsPanel;