import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function POST(req) {
  const { id, clerkId, emoji, budgetName, budgetAmount } = await req.json();
  console.log(emoji)
  try {
    await connectToDb();
    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const budget = user.Budget.id(id);
    console.log(budget);

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }
    budget.emoji = emoji;
    budget.expenseName = budgetName;
    budget.expenseTotalAmount = budgetAmount;
    await user.save();
    return NextResponse.json(
      { message: "Budget updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Error while Adding" },
      { status: 500 }
    );
  }
}
