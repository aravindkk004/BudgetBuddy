import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const user = await User.findOne({ clerkId: id }).select("Budget");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let totalExpenseAmount = 0;
    let totalSpentAmount = 0;
    let totalExpenses = 0;

    user.Budget.forEach((expense) => {
      totalExpenseAmount += expense.expenseTotalAmount;
      totalExpenses++; 
      expense.budgets.forEach((budget) => {
        totalSpentAmount += budget.budgetAmount;
      });
    });

    return NextResponse.json(
      {
        totalExpenseAmount,
        totalSpentAmount,
        totalExpenses,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching expense", error: error.message },
      { status: 500 }
    );
  }
}
