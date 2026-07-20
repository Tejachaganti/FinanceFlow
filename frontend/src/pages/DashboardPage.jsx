import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyLineChart from "../components/charts/MonthlyLineChart";
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
    analytics,
    insights,
    expenses,
    snapshot,
  } = useFinance();

  const cards = [
    {
      label: "Total Balance",
      value: snapshot?.balance || 0,
      trend: "up",
      change: "+2.3%",
      caption: "vs last month",
      color: "blue",
    },
    {
      label: "Total Expenses",
      value: analytics?.totals?.totalExpenses || 0,
      trend: "down",
      change: "-5%",
      caption: "vs last month",
      color: "green",
    },
    {
      label: "Total Income",
      value: snapshot?.income || 0,
      trend: "up",
      change: "+8%",
      caption: "vs last month",
      color: "purple",
    },
    {
      label: "Savings Rate",
      value: snapshot?.savingsRate || 0,
      trend: "up",
      change: "+12%",
      caption: "vs last month",
      color: "orange",
      isPercentage: true,
    },
  ];
console.log("Monthly Expenses:", analytics?.monthlyExpenses);
  return (
    <div className="space-y-7">

      {/* Hero */}

      <DashboardHero
        user={user}
        snapshot={snapshot}
      />

      {/* KPI Cards */}

      <StatsCards
        cards={cards}
      />

      {/* Monthly + Health */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

         <MonthlyLineChart
  data={analytics?.monthlyExpenses || []}
/>

        </div>

        <FinancialHealthCard
          snapshot={snapshot}
        />

      </section>

      {/* Category + AI */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <CategoryPieChart data={analytics?.categoryData || []} />

        <InsightsPanel
          insights={insights || []}
        />

      </section>

      {/* Bottom */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <RecentTransactions
          expenses={expenses || []}
        />

        <QuickActions />

      </section>

    </div>
  );
};

export default DashboardPage;