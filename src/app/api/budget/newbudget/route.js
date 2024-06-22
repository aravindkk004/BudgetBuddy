import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function POST(req) {
  try {
    await connectToDb();
    const { budgetName, budgetAmount, clerkId, emoji } = await req.json();

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ error: "User not Found" }, { status: 404 });
    }

    const newBudget = {
      emoji: emoji,
      expenseName: budgetName,
      expenseTotalAmount: budgetAmount,
    };

    user.Budget.push(newBudget);
    await user.save();
    return NextResponse.json(
      { message: "Budget Added successfully" },
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
