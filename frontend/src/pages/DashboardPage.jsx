import SectionHeading from "../components/common/SectionHeading";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyLineChart from "../components/charts/MonthlyLineChart";
import InsightsPanel from "../components/dashboard/InsightsPanel";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import StatsCards from "../components/dashboard/StatsCards";
import useAuth from "../hooks/useAuth";
import useFinance from "../hooks/useFinance";

const DashboardPage = () => {
  const { user } = useAuth();
  const { analytics, insights, expenses, snapshot } = useFinance();

  const cards = [
    { label: "Total expenses", value: analytics?.totals.totalExpenses || 0, trend: "down", caption: "All recorded spending" },
    { label: "Monthly spending", value: snapshot?.spent || 0, trend: "down", caption: "Current month burn rate" },
    { label: "Remaining budget", value: snapshot?.remaining || 0, trend: "up", caption: "Spendable amount left" },
    { label: "Savings summary", value: snapshot?.savings || 0, trend: "up", caption: "Income minus expenses" }
  ];

  return (
    <div className="space-y-4">
      <SectionHeading title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}`} subtitle="Monitor cash flow, budgets, and AI-powered insights from one professional command center." />
      <StatsCards cards={cards} currency={user?.currency} />
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <MonthlyLineChart data={analytics?.monthlyExpenses || []} />
        <InsightsPanel insights={insights || []} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <CategoryPieChart data={analytics?.categoryData || []} />
        <RecentTransactions expenses={expenses || []} currency={user?.currency} />
      </div>
    </div>
  );
};

export default DashboardPage;
