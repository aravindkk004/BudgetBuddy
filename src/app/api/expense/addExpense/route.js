import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function POST(req) {
  console.log("i am in api port")
  try {
    const {userId, names, expenseid, expenseName, expenseAmount} = await req.json();
    await connectToDb();
    const user = await User.findOne({ clerkId: userId});

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    const budget = user.Budget.id(expenseid);
    console.log(budget)
    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    budget.budgets.push({
      budgetName: expenseName,
      budgetAmount: expenseAmount
    });

    await user.save();
    return NextResponse.json(
      { message: "Expense Added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while Adding" },
      { status: 500 }
    );
  }
}
