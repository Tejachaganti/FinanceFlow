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
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Artificial Intelligence
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            AI Financial Advisor
          </h2>

          <p className="mt-2 text-slate-400">
            Smart recommendations based on your financial activity.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

          <Brain
            size={30}
            className="text-white"
          />

        </div>

      </div>

      {/* Empty */}

      {!insights.length && (

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 py-16">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">

            <Brain
              size={30}
              className="text-cyan-400"
            />

          </div>

          <h3 className="text-xl font-semibold text-white">
            No AI Insights Yet
          </h3>

          <p className="mt-3 max-w-sm text-center text-slate-400">
            Add more financial activity to receive personalized AI recommendations.
          </p>

        </div>

      )}

      {/* Insights */}

      {!!insights.length && (

        <div className="space-y-5">

          {insights.map((item) => {
            const config = toneConfig[item.tone] || toneConfig.info;

            return (
              <div
                key={item.title}
                className={`rounded-3xl border ${config.border} ${config.bg} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >

                <div className="flex items-start gap-5">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconBg} ${config.iconColor}`}
                  >
                    {config.icon}
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>

                      <span className="rounded-full bg-slate-900/50 px-3 py-1 text-xs uppercase tracking-wider text-slate-400">
                        {item.tone || "info"}
                      </span>

                    </div>

                    <p className="mt-3 leading-7 text-slate-300">
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