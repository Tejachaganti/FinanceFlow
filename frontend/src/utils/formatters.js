export const DEFAULT_CURRENCY = "INR";

export const formatCurrency = (value, currency = DEFAULT_CURRENCY) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: currency || DEFAULT_CURRENCY, maximumFractionDigits: 0 }).format(Number(value || 0));

export const formatDate = (value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const getBudgetTone = (percent) => {
  if (percent >= 100) return "text-rose-400";
  if (percent >= 80) return "text-amber-400";
  return "text-emerald-400";
};
