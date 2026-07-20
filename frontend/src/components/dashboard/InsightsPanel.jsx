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
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            AI Financial Advisor
          </h2>

          <p className="text-sm text-slate-400">
            Personalized recommendations
          </p>
        </div>

        <div className="rounded-2xl bg-violet-500/20 p-3 text-violet-300">
          <Brain size={22} />
        </div>

      </div>

      <div className="space-y-4">

        {insights.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 py-8 text-center text-slate-400">
            No insights available.
          </div>
        )}

        {insights.map((item) => {
          const config = toneConfig[item.tone] || toneConfig.info;

          return (
            <div
              key={item.title}
              className={`rounded-2xl border ${config.border} ${config.bg} p-4 transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex gap-4">

                <div
                  className={`h-10 w-10 rounded-xl ${config.iconBg} flex items-center justify-center ${config.iconColor}`}
                >
                  {config.icon}
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default InsightsPanel;