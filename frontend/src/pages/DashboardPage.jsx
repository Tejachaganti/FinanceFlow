import DashboardHero from "../components/dashboard/DashboardHero";
import FinancialHealthCard from "../components/dashboard/FinancialHealthCard";
import InsightsPanel from "../components/dashboard/InsightsPanel";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import StatsCards from "../components/dashboard/StatsCards";
import useAuth from "../hooks/useAuth";
import useFinance from "../hooks/useFinance";

const DashboardPage = () => {
  const { user } = useAuth();

  const {
    
    insights,
    expenses,
    snapshot,
    dashboard,
  } = useFinance();

  const cards = [
  {
    label: "Total Balance",
    value: dashboard.balance,
    progress: dashboard.financialHealth,
    trend: "up",
    change: "+2.3%",
    caption: "Current Balance",
    color: "blue",
  },
  {
    label: "Total Expenses",
    value: dashboard.totalExpenses,
    progress:
      dashboard.totalIncome > 0
        ? (dashboard.totalExpenses / dashboard.totalIncome) * 100
        : 0,
    trend: "down",
    change: "-5%",
    caption: "All Expenses",
    color: "green",
  },
  {
    label: "Total Income",
    value: dashboard.totalIncome,
    progress: 100,
    trend: "up",
    change: "+8%",
    caption: "All Income",
    color: "purple",
  },
  {
    label: "Savings Rate",
    value: dashboard.savingsRate,
    progress: dashboard.savingsRate,
    trend: dashboard.savingsRate >= 50 ? "up" : "down",
    change: `${dashboard.savingsRate}%`,
    caption: "Savings",
    color: "orange",
    isPercentage: true,
  },
];

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Hero */}
        <DashboardHero
          user={user}
          snapshot={{
            ...snapshot,
            balance: dashboard.balance,
            income: dashboard.totalIncome,
            savingsRate: dashboard.savingsRate,
          }}
        />

        {/* Stats */}
        <StatsCards cards={cards} />

        {/* Financial Health */}
<FinancialHealthCard
  dashboard={dashboard}
/>

        {/* AI Insights */}
<InsightsPanel
  insights={insights || []}
/>
       
        {/* Bottom */}
        <section className="grid gap-8 xl:grid-cols-2">
          <RecentTransactions
            expenses={expenses || []}
          />

          <QuickActions />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;