const getFinancialInsights = ({
  expenses = [],
  budgets = [],
  income = 0,
}) => {
  const insights = [];

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  if (totalSpent === 0) {
    return [
      {
        type: "info",
        title: "Start Tracking",
        message:
          "Add your first expense to receive personalized financial insights.",
      },
    ];
  }

  // Category spending
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(expense.amount);
  });

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  );

  if (sortedCategories.length) {
    const [category, amount] = sortedCategories[0];

    insights.push({
      type: "warning",
      title: "Highest Spending Category",
      message: `${category} accounts for ₹${amount.toLocaleString()} of your spending.`,
    });
  }

  // Budget checks
  budgets.forEach((budget) => {
    const spent = categoryTotals[budget.category] || 0;

    const percent = (spent / budget.limit) * 100;

    if (percent >= 100) {
      insights.push({
        type: "danger",
        title: "Budget Exceeded",
        message: `${budget.category} exceeded its budget by ₹${(
          spent - budget.limit
        ).toLocaleString()}.`,
      });
    } else if (percent >= 80) {
      insights.push({
        type: "warning",
        title: "Budget Alert",
        message: `${budget.category} has reached ${Math.round(
          percent
        )}% of its budget.`,
      });
    }
  });
// Largest Expense
const largestExpense = expenses.reduce((largest, current) => {
  return Number(current.amount) > Number(largest.amount)
    ? current
    : largest;
}, expenses[0]);

if (largestExpense) {
  insights.push({
    type: "info",
    title: "Largest Expense",
    message: `${largestExpense.title || largestExpense.description || "Expense"} cost ₹${Number(
      largestExpense.amount
    ).toLocaleString()}.`,
  });
}
  // Savings
  if (income > 0) {
    const savings = income - totalSpent;

    const rate = (savings / income) * 100;

    insights.push({
      type: "success",
      title: "Savings Rate",
      message: `You saved ₹${savings.toLocaleString()} (${rate.toFixed(
        1
      )}% of your income).`,
    });
  }

  if (insights.length < 4) {
    insights.push({
      type: "info",
      title: "Smart Suggestion",
      message:
        "Track expenses daily for more accurate AI recommendations.",
    });
  }

  return insights;
};

module.exports = getFinancialInsights;