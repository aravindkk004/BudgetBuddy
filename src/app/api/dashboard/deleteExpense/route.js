import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function DELETE(req) {
  const userId = req.nextUrl.searchParams.get("userId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");

  if (!userId || !expenseId) {
    return NextResponse.json({ error: "Missing userId or expenseId" }, { status: 400 });
  }

  try {
    await connectToDb();
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let expenseDeleted = false;

    user.Budget.forEach((budget) => {
      budget.budgets.forEach((expense) => {
        if (expense._id.toString() === expenseId) {
          // Remove the expense from the array
          budget.budgets.pull({ _id: expense._id });
          expenseDeleted = true;
        }
      });
    });

    if (!expenseDeleted) {
      return NextResponse.json({ error: "Expense not found for deletion" }, { status: 404 });
    }

    // Save the updated user document
    await user.save();

    return NextResponse.json({ message: "Expense deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error while deleting expense data:", error);
    return NextResponse.json({ error: "Error while deleting expense data" }, { status: 500 });
  }
}
