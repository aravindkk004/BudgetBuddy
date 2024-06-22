import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  budgetName: {
    type: String,
  },
  budgetAmount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const expenseShcema = new mongoose.Schema({
  emoji: {
    type: String,
  },
  expenseName: {
    type: String,
  },
  expenseTotalAmount: {
    type: Number,
  },
  budgets: [budgetSchema],
});

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    Budget: [expenseShcema],
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
