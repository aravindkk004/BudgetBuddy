import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function DELETE(req) {
  const userId = req.nextUrl.searchParams.get("userId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");
  const budgetId = req.nextUrl.searchParams.get("budgetId");

  try {
    await connectToDb();
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const budget = user.Budget.id(budgetId);

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found for deletion" },
        { status: 404 }
      );
    }
    const expense = budget.budgets.id(expenseId);

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found for deletion" },
        { status: 404 }
      );
    }
    budget.budgets.pull({ _id: expenseId });
    await user.save();

    return NextResponse.json(
      { message: "Expense deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting expense data:", error);
    return NextResponse.json(
      { message: "Error while deleting expense data" },
      { status: 500 }
    );
  }
}
