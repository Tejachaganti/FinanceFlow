import { useEffect, useState } from "react";
import { categories, paymentMethods } from "../../utils/constants";

const initialState = {
  title: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().slice(0, 10),
  paymentMethod: "UPI",
  notes: "",
  recurring: false,
  recurringFrequency: "none",
  receipt: null
};

const ExpenseForm = ({ onSubmit, editingExpense, onCancel }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!editingExpense) {
      setForm(initialState);
      return;
    }

    setForm({
      ...editingExpense,
      date: editingExpense.date?.slice(0, 10),
      receipt: null
    });
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });
    await onSubmit(payload);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
      <input className="field" name="title" value={form.title} onChange={handleChange} placeholder="Expense title" required />
      <input className="field" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} placeholder="Amount" required />
      <select className="field" name="category" value={form.category} onChange={handleChange}>
        {categories.map((category) => <option key={category}>{category}</option>)}
      </select>
      <input className="field" name="date" type="date" value={form.date} onChange={handleChange} required />
      <select className="field" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
        {paymentMethods.map((method) => <option key={method}>{method}</option>)}
      </select>
      <input className="field" name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <select className="field" name="recurringFrequency" value={form.recurringFrequency} onChange={handleChange}>
        <option value="none">No recurring</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input className="field" name="receipt" type="file" accept="image/*" onChange={handleChange} />
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200">
        <input name="recurring" type="checkbox" checked={form.recurring} onChange={handleChange} />
        Mark as recurring expense
      </label>
      <div className="flex gap-3 md:col-span-2 xl:col-span-3">
        <button type="submit" className="btn-primary">{editingExpense ? "Update expense" : "Add expense"}</button>
        {editingExpense ? <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  );
};

export default ExpenseForm;
