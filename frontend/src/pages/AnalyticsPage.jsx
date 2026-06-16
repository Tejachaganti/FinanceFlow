import SectionHeading from "../components/common/SectionHeading";
import BudgetVsActualChart from "../components/charts/BudgetVsActualChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyLineChart from "../components/charts/MonthlyLineChart";
import WeeklyBarChart from "../components/charts/WeeklyBarChart";
import useFinance from "../hooks/useFinance";

const AnalyticsPage = () => {
  const { analytics, exportReport } = useFinance();

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Analytics & reports"
        subtitle="Visualize category mix, weekly bursts, and budget discipline with export-ready reporting."
        action={
          <div className="flex gap-3">
            <button type="button" className="btn-secondary" onClick={() => exportReport("csv")}>Export CSV</button>
            <button type="button" className="btn-primary" onClick={() => exportReport("pdf")}>Export PDF</button>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <CategoryPieChart data={analytics?.categoryData || []} />
        <MonthlyLineChart data={analytics?.monthlyExpenses || []} />
        <WeeklyBarChart data={analytics?.weeklySpending || []} />
        <BudgetVsActualChart data={analytics?.budgetVsActual || []} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
