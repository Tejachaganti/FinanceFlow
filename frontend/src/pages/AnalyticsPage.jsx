import SectionHeading from "../components/common/SectionHeading";
import BudgetVsActualChart from "../components/charts/BudgetVsActualChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyLineChart from "../components/charts/MonthlyLineChart";
import WeeklyBarChart from "../components/charts/WeeklyBarChart";
import useFinance from "../hooks/useFinance";

const AnalyticsPage = () => {
  const { analytics, exportReport } = useFinance();

  return (
  <div className="min-h-screen bg-[#0B1120]">

    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

      {/* Hero */}

      <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">

              Analytics

            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">

              Reports & Insights

            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-400">

              Understand your spending patterns through
              interactive charts, reports and export-ready
              financial analytics.

            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <button
              type="button"
              onClick={() => exportReport("csv")}
              className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800"
            >
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => exportReport("pdf")}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Export PDF
            </button>

          </div>

        </div>

      </div>

      {/* Analytics Grid */}

      <section className="grid gap-8 xl:grid-cols-2">

        <CategoryPieChart
          data={analytics?.categoryData || []}
        />

        <MonthlyLineChart
          data={analytics?.monthlyExpenses || []}
        />

        <WeeklyBarChart
          data={analytics?.weeklySpending || []}
        />

        <BudgetVsActualChart
          data={analytics?.budgetVsActual || []}
        />

      </section>

    </div>

  </div>
);
};

export default AnalyticsPage;
