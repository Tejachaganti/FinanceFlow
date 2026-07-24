import Expense from "../models/Expense.js";
import { buildExpenseFilters, getSortOption } from "../utils/queryHelpers.js";

// Category Normalization
const CATEGORY_MAP = {
  // Travel
  transport: "Travel",
  transportation: "Travel",
  taxi: "Travel",
  uber: "Travel",
  ola: "Travel",
  cab: "Travel",
  bus: "Travel",
  train: "Travel",
  metro: "Travel",
  flight: "Travel",
  petrol: "Travel",
  fuel: "Travel",
  diesel: "Travel",
  bike: "Travel",

  // Food
  restaurant: "Food",
  groceries: "Food",
  grocery: "Food",
  lunch: "Food",
  dinner: "Food",
  breakfast: "Food",
  snacks: "Food",
  coffee: "Food",

  // Bills
  electricity: "Bills",
  water: "Bills",
  internet: "Bills",
  wifi: "Bills",
  rent: "Bills",
  recharge: "Bills",

  // Shopping
  amazon: "Shopping",
  flipkart: "Shopping",
  clothes: "Shopping",

  // Healthcare
  hospital: "Healthcare",
  medical: "Healthcare",
  medicine: "Healthcare",

  // Entertainment
  movie: "Entertainment",
  netflix: "Entertainment",
  spotify: "Entertainment",
};

function normalizeCategory(category = "") {
  const key = category.trim().toLowerCase();
  return CATEGORY_MAP[key] || "Others";
}

export const getExpenses = async (req, res, next) => {
  try {
    const filters = buildExpenseFilters(req.query, req.user._id);
    const sort = getSortOption(req.query.sortBy, req.query.order);
    const expenses = await Expense.find(filters).sort(sort);
    res.json({ success: true, expenses });
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      const error = new Error("Expense not found.");
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, expense });
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const payload = {
  ...req.body,
  user: req.user._id,
};

payload.category = normalizeCategory(payload.category);
    if (req.file) {
      payload.receiptUrl = `/uploads/${req.file.filename}`;
    }
    const expense = await Expense.create(payload);
    res.status(201).json({ success: true, expense });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      const error = new Error("Expense not found.");
      error.statusCode = 404;
      throw error;
    }

    if (req.body.category) {
      req.body.category = normalizeCategory(req.body.category);
    }

    Object.assign(expense, req.body);

    if (req.file) {
      expense.receiptUrl = `/uploads/${req.file.filename}`;
    }

    const updatedExpense = await expense.save();

    res.json({
      success: true,
      expense: updatedExpense,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      const error = new Error("Expense not found.");
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, message: "Expense deleted successfully." });
  } catch (error) {
    next(error);
  }
};
