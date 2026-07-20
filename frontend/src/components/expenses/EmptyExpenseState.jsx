import {
  PlusCircle,
  Wallet,
  Sparkles,
  TrendingUp,
  Receipt,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Receipt,
    title: "Track Spending",
    description: "Record every expense in seconds and keep your finances organized.",
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Visualize spending patterns and discover meaningful insights.",
  },
  {
    icon: ShieldCheck,
    title: "Better Budgeting",
    description: "Build healthy financial habits and stay in control of your money.",
  },
];

const EmptyExpenseState = ({ onCreate }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-700/40 bg-[#131A2A] shadow-2xl">

      {/* Hero */}

      <div className="relative px-8 py-20">

        {/* Background Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5" />

        <div className="relative flex flex-col items-center text-center">

          {/* Icon */}

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/30">

            <Wallet
              size={46}
              className="text-white"
            />

          </div>

          <h2 className="mt-8 text-4xl font-bold text-white">

            No Expenses Yet

          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

            Start tracking your expenses to unlock powerful analytics,
            spending trends, budgeting insights, and a complete overview
            of your financial activity.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button
              onClick={onCreate}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40"
            >

              <PlusCircle size={20} />

              Add First Expense

            </button>

            <button
              disabled
              className="flex cursor-default items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 text-slate-400"
            >

              <Sparkles size={18} />

              AI Insights Coming Soon

            </button>

          </div>

        </div>

      </div>

      {/* Features */}

      <div className="border-t border-slate-700 bg-slate-900/40 p-8">

        <div className="grid gap-6 md:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-700 bg-[#131A2A] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">

                  <Icon
                    size={24}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">

                  {feature.title}

                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-400">

                  {feature.description}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default EmptyExpenseState;