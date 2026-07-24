import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic Details
    title: {
      type: String,
      required: true,
      trim: true,
    },

    merchant: {
      type: String,
      trim: true,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

   category: {
  type: String,
  enum: [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Education",
    "Entertainment",
    "Healthcare",
    "Others",
  ],
  default: "Others",
},


    date: {
      type: Date,
      required: true,
    },

    // Payment
    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "Credit Card",
        "Debit Card",
        "UPI",
        "Bank Transfer",
        "Wallet",
      ],
      default: "UPI",
    },

    account: {
      type: String,
      default: "Primary",
    },

    // Organization
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    location: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    // Attachments
    receiptUrl: {
      type: String,
      default: "",
    },

    // Recurring
    recurring: {
      type: Boolean,
      default: false,
    },

    recurringFrequency: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },

    // Productivity
    favorite: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Completed", "Pending"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });
expenseSchema.index({ user: 1, merchant: 1 });
expenseSchema.index({ user: 1, tags: 1 });
expenseSchema.index({ user: 1, favorite: 1 });

export default mongoose.model("Expense", expenseSchema);