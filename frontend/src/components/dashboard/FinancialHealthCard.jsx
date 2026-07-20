import { PieChart } from "lucide-react";

const FinancialHealthCard = ({ snapshot }) => {
  const savings = snapshot?.savings || 0;

  const score =
    savings > 10000
      ? 95
      : savings > 5000
      ? 80
      : savings > 1000
      ? 65
      : 45;

  const radius = 90;
  const stroke = 12;

  const normalizedRadius = radius - stroke / 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  const status =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : score >= 40
      ? "Fair"
      : "Poor";

  return (
    <div className="rounded-3xl border border-white/10 bg-[#131D33] p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-white">
          Financial Health
        </h2>

        <div className="rounded-xl bg-emerald-500/15 p-3">
          <PieChart className="text-emerald-400" size={20} />
        </div>

      </div>

      <div className="flex justify-center">

        <svg width="220" height="220">

          <circle
            stroke="#26334D"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="110"
            cy="110"
          />

          <circle
            stroke="#22C55E"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx="110"
            cy="110"
            style={{
              transition: "stroke-dashoffset 0.8s ease",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />

          <text
            x="110"
            y="102"
            textAnchor="middle"
            fill="white"
            fontSize="52"
            fontWeight="700"
          >
            {score}
          </text>

          <text
            x="110"
            y="132"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="16"
          >
            /100 Score
          </text>

        </svg>

      </div>

      <div className="text-center">

        <h3 className="text-3xl font-bold text-emerald-400">
          {status}
        </h3>

        <p className="mt-2 text-slate-400">
          You're on the right track.
        </p>

        <p className="text-slate-500">
          Keep optimizing your spending habits.
        </p>

      </div>

    </div>
  );
};

export default FinancialHealthCard;