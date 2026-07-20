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
    <form
  onSubmit={handleSubmit}
  className="space-y-6"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div>
      <label className="block text-sm font-medium mb-2">
        Expense Title
      </label>

      <input
        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Dinner at KFC"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Amount
      </label>

      <input
        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        name="amount"
        type="number"
        min="0"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        placeholder="0.00"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Category
      </label>

      <select
        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3"
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Date
      </label>

      <input
        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Payment Method
      </label>

      <select
        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3"
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
      >
        {paymentMethods.map((method) => (
          <option key={method}>
            {method}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Recurring
      </label>

      <select
        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3"
        name="recurringFrequency"
        value={form.recurringFrequency}
        onChange={handleChange}
      >
        <option value="none">No Recurring</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>

  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Notes
    </label>

    <textarea
      rows={4}
      className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent px-4 py-3 resize-none"
      name="notes"
      value={form.notes}
      onChange={handleChange}
      placeholder="Optional notes..."
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Receipt
    </label>

    <input
      type="file"
      name="receipt"
      accept="image/*"
      onChange={handleChange}
      className="w-full rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-4"
    />
  </div>

  <label className="flex items-center gap-3 rounded-xl border border-gray-300 dark:border-slate-700 p-4">
    <input
      type="checkbox"
      name="recurring"
      checked={form.recurring}
      onChange={handleChange}
    />

    <span>
      Mark this as a recurring expense
    </span>
  </label>

  <div className="flex justify-end gap-3 pt-2">

    {editingExpense && (
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-700"
      >
        Cancel
      </button>
    )}

    <button
      type="submit"
      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
    >
      {editingExpense ? "Update Expense" : "Add Expense"}
    </button>

  </div>
</form>
  );
};

export default ExpenseForm;
