import { useEffect, useState } from "react";
import {
  Receipt,
  IndianRupee,
  Tag,
  CalendarDays,
  CreditCard,
  Repeat,
  StickyNote,
  UploadCloud,
} from "lucide-react";

import {
  categories,
  paymentMethods,
} from "../../utils/constants";

const initialState = {
  title: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().slice(0, 10),
  paymentMethod: "UPI",
  notes: "",
  recurring: false,
  recurringFrequency: "none",
  receipt: null,
};

const ExpenseForm = ({
  onSubmit,
  editingExpense,
  onCancel,
}) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!editingExpense) {
      setForm(initialState);
      return;
    }

    setForm({
      ...editingExpense,
      date: editingExpense.date?.slice(0, 10),
      receipt: null,
    });
  }, [editingExpense]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : files
          ? files[0]
          : value,
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
      className="space-y-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Expense Title */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <Receipt size={16} />

            Expense Title

          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Dinner at KFC"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

        </div>

        {/* Amount */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <IndianRupee size={16} />

            Amount

          </label>

          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <Tag size={16} />

            Category

          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          >
            {categories.map((category) => (
              <option
                key={category}
                className="bg-slate-900"
              >
                {category}
              </option>
            ))}
          </select>

        </div>

        {/* Date */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <CalendarDays size={16} />

            Date

          </label>

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

        </div>

        {/* Payment Method */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <CreditCard size={16} />

            Payment Method

          </label>

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          >
            {paymentMethods.map((method) => (
              <option
                key={method}
                className="bg-slate-900"
              >
                {method}
              </option>
            ))}
          </select>

        </div>

        {/* Recurring Frequency */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <Repeat size={16} />

            Recurring Frequency

          </label>

          <select
            name="recurringFrequency"
            value={form.recurringFrequency}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="none" className="bg-slate-900">
              No Recurring
            </option>

            <option value="daily" className="bg-slate-900">
              Daily
            </option>

            <option value="weekly" className="bg-slate-900">
              Weekly
            </option>

            <option value="monthly" className="bg-slate-900">
              Monthly
            </option>

          </select>

        </div>

        {/* Notes */}

        <div className="md:col-span-2">

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

            <StickyNote size={16} />

            Notes

          </label>

          <textarea
            rows={5}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Optional notes..."
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
                {/* Receipt Upload */}

        <div className="md:col-span-2">

          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">

            <UploadCloud size={16} />

            Upload Receipt

          </label>

          <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/40 p-8 transition hover:border-cyan-500/40">

            <div className="flex flex-col items-center justify-center text-center">

              <UploadCloud
                size={42}
                className="mb-3 text-cyan-400"
              />

              <p className="text-sm font-medium text-white">
                Upload Receipt Image
              </p>

              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG or JPEG
              </p>

              <input
                type="file"
                name="receipt"
                accept="image/*"
                onChange={handleChange}
                className="mt-6 w-full cursor-pointer text-sm text-slate-400
                file:mr-4
                file:rounded-xl
                file:border-0
                file:bg-cyan-500
                file:px-4
                file:py-2
                file:font-medium
                file:text-white
                hover:file:bg-cyan-600"
              />

              {form.receipt && (
                <p className="mt-4 text-sm text-emerald-400">
                  Selected: {form.receipt.name}
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Recurring Expense */}

      <label className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 p-5 transition hover:border-cyan-500/40">

        <div>

          <h3 className="font-semibold text-white">
            Recurring Expense
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Automatically repeat this expense
          </p>

        </div>

        <input
          type="checkbox"
          name="recurring"
          checked={form.recurring}
          onChange={handleChange}
          className="h-5 w-5 accent-cyan-500"
        />

      </label>

      {/* Buttons */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-700 pt-6 sm:flex-row sm:justify-end">

        {editingExpense && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-800"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40"
        >
          {editingExpense
            ? "Update Expense"
            : "Add Expense"}
        </button>

      </div>

    </form>
  );
};

export default ExpenseForm;