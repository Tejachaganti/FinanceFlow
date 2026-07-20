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

  const strokeColor =
    score >= 80
      ? "#10B981"
      : score >= 60
      ? "#06B6D4"
      : score >= 40
      ? "#F59E0B"
      : "#EF4444";

  return (
    <section className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Overview
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Financial Health
          </h2>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

          <PieChart
            size={28}
            className="text-white"
          />

        </div>

      </div>

      {/* Score */}

      <div className="flex justify-center">

        <svg
          width="220"
          height="220"
        >

          <circle
            stroke="#243044"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="110"
            cy="110"
          />

          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx="110"
            cy="110"
            style={{
              transition: "stroke-dashoffset .8s ease",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />

          <text
            x="110"
            y="102"
            textAnchor="middle"
            fill="white"
            fontSize="48"
            fontWeight="700"
          >
            {score}
          </text>

          <text
            x="110"
            y="132"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="15"
          >
            Health Score
          </text>

        </svg>

      </div>

      {/* Status */}

      <div className="mt-2 text-center">

        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
            score >= 80
              ? "bg-emerald-500/10 text-emerald-400"
              : score >= 60
              ? "bg-cyan-500/10 text-cyan-400"
              : score >= 40
              ? "bg-amber-500/10 text-amber-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {status}
        </span>

        <p className="mt-5 text-slate-400">
          Your current savings indicate
        </p>

        <h3 className="mt-2 text-xl font-semibold text-white">
          {status} Financial Stability
        </h3>

        <p className="mt-4 leading-7 text-slate-500">
          Continue tracking your expenses and increasing
          your monthly savings to improve your financial score.
        </p>

      </div>

      {/* Footer Stats */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-900/60 p-4 text-center">

          <p className="text-sm text-slate-400">
            Savings
          </p>

          <h4 className="mt-2 text-lg font-bold text-emerald-400">
            ₹{savings.toLocaleString()}
          </h4>

        </div>

        <div className="rounded-2xl bg-slate-900/60 p-4 text-center">

          <p className="text-sm text-slate-400">
            Score
          </p>

          <h4 className="mt-2 text-lg font-bold text-cyan-400">
            {score}/100
          </h4>

        </div>

      </div>

    </section>
  );
};

export default FinancialHealthCard;