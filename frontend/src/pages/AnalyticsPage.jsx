import { AlertCircle, BrainCircuit, Layers3, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import AnalyticsHero from "../components/analytics/AnalyticsHero";
import AnalyticsStats from "../components/analytics/AnalyticsStats";
import BudgetVsActualChart from "../components/charts/BudgetVsActualChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyLineChart from "../components/charts/MonthlyLineChart";
import WeeklyBarChart from "../components/charts/WeeklyBarChart";
import useFinance from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatters";

const SectionHeading = ({ eyebrow, title, description, icon: Icon }) => (
  <div className="flex gap-3 sm:items-center">
    {Icon && <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Icon size={19} /></span>}
    <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">{eyebrow}</p><h2 className="mt-0.5 text-xl font-bold text-white">{title}</h2>{description && <p className="mt-1 text-sm text-slate-400">{description}</p>}</div>
  </div>
);

const AnalyticsPage = () => {
  const { analytics, dashboard, insights, loading, exportReport, fetchFinanceData } = useFinance();
  const categories = [...(analytics?.categoryData || [])].sort((a, b) => Number(b.value) - Number(a.value));
  const monthly = analytics?.monthlyExpenses || [];
  const latestMonth = monthly.at(-1);
  const previousMonth = monthly.at(-2);
  const change = previousMonth?.amount ? ((latestMonth?.amount - previousMonth.amount) / previousMonth.amount) * 100 : null;
  const budgetData = (analytics?.budgetVsActual || []).map((item) => item.label === "Budget" ? { label: "This month", budget: item.value, actual: 0 } : { label: "This month", budget: 0, actual: item.value }).reduce((result, item) => ({ label: item.label, budget: result.budget + item.budget, actual: result.actual + item.actual }), { label: "This month", budget: 0, actual: 0 });
  const hasData = Boolean(analytics);

  return <main className="min-h-screen bg-[#0B1120] text-white">
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <AnalyticsHero onExportCSV={() => exportReport("csv")} onExportPDF={() => exportReport("pdf")} />
      <AnalyticsStats dashboard={dashboard} loading={loading} />

      {!loading && !hasData ? <section role="alert" className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-6 text-center sm:p-10"><AlertCircle className="mx-auto text-rose-300" size={32} /><h2 className="mt-4 text-xl font-semibold">Analytics are unavailable</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">We couldn’t load your latest analytics. Your financial data is safe—please try again.</p><button onClick={fetchFinanceData} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-semibold text-slate-950 transition hover:bg-white"><RefreshCw size={16} /> Try again</button></section> : <>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5"><div className="xl:col-span-3"><MonthlyLineChart data={monthly} /></div><div className="xl:col-span-2"><WeeklyBarChart data={analytics?.weeklySpending || []} /></div></section>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2"><CategoryPieChart data={categories} /><BudgetVsActualChart data={[budgetData]} /></section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-slate-700/50 bg-[#131A2A] p-5 sm:p-6 xl:col-span-3">
            <SectionHeading eyebrow="AI insights" title="Personalized signals" description="Generated from your current finance data." icon={BrainCircuit} />
            <div className="mt-6 space-y-3">{insights?.length ? insights.slice(0, 3).map((insight, index) => <div key={`${insight.title}-${index}`} className="rounded-2xl border border-slate-700/50 bg-slate-900/45 p-4 transition hover:border-cyan-400/40"><div className="flex gap-3"><Sparkles size={17} className="mt-0.5 shrink-0 text-cyan-300" /><div><h3 className="font-semibold text-slate-100">{insight.title}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{insight.description}</p></div></div></div>) : <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-5 py-8 text-center"><BrainCircuit className="mx-auto text-slate-500" size={28} /><p className="mt-3 font-medium text-slate-300">Insights will appear as activity grows</p><p className="mt-1 text-sm text-slate-500">Add income, expenses, and a budget to unlock tailored signals.</p></div>}</div>
          </motion.section>

          <section className="rounded-3xl border border-slate-700/50 bg-[#131A2A] p-5 sm:p-6 xl:col-span-2">
            <SectionHeading eyebrow="Breakdown" title="Top spending categories" icon={Layers3} />
            <div className="mt-6 space-y-4">{categories.length ? categories.slice(0, 4).map((category, index) => { const total = categories.reduce((sum, item) => sum + Number(item.value || 0), 0); const percentage = total ? (Number(category.value) / total) * 100 : 0; return <div key={category.name}><div className="flex items-center justify-between gap-3 text-sm"><span className="truncate font-medium text-slate-200">{index + 1}. {category.name}</span><span className="shrink-0 font-semibold text-white">{formatCurrency(category.value)}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${percentage}%` }} /></div></div>; }) : <p className="py-8 text-center text-sm text-slate-500">No category spending to show yet.</p>}</div>
          </section>
        </section>

        <section className="rounded-3xl border border-slate-700/50 bg-[#131A2A] p-5 sm:p-6"><SectionHeading eyebrow="Recent trends" title="Spending momentum" description="A compact view built from your monthly expense history." icon={TrendingUp} /><div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><div className="rounded-2xl bg-slate-900/55 p-4"><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Latest recorded month</p><p className="mt-2 text-lg font-semibold text-white">{latestMonth?.month || "No data"}</p><p className="mt-1 text-sm text-cyan-300">{latestMonth ? formatCurrency(latestMonth.amount) : "Add an expense to begin"}</p></div><div className="rounded-2xl bg-slate-900/55 p-4"><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Month-over-month</p><p className="mt-2 text-lg font-semibold text-white">{change === null ? "Not enough history" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`}</p><p className="mt-1 text-sm text-slate-400">{change === null ? "Compare two recorded months" : change > 0 ? "Spending increased from prior month" : "Spending decreased from prior month"}</p></div><div className="rounded-2xl bg-slate-900/55 p-4"><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Budget status</p><p className="mt-2 text-lg font-semibold text-white">{dashboard?.monthlyBudget ? formatCurrency(Math.abs(dashboard.remainingBudget)) : "No budget set"}</p><p className="mt-1 text-sm text-slate-400">{dashboard?.monthlyBudget ? dashboard.remainingBudget >= 0 ? "remaining in your budget" : "over your budget" : "Set a budget to track progress"}</p></div></div></section>
      </>}
    </div>
  </main>;
};

export default AnalyticsPage;
