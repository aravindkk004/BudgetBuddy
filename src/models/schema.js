import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  budgetName: {
    type: String,
    required: true,
  },
  budgetAmount: {
    type: Number,
    required: true,
  },
});

const expenseShcema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true,
  },
  expenseTotalAmount: {
    type: Number,
    required: true,
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