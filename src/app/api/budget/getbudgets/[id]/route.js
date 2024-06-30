import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function GET(req, { params }) {
  await connectToDb();
  try {
    const { id } = params;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      return NextResponse.json({ error: "User not Found" }, { status: 404 });
    }

    const userBudget = user.Budget.map((budget) => {
      let totalSpentAmount = 0;
      budget.budgets.forEach((item) => {
        totalSpentAmount += item.budgetAmount;
      });
      return {
        ...budget.toObject(), 
        totalSpentAmount,
      };
    });

    return NextResponse.json({ userBudget }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Error while fetching budget data" },
      { status: 500 }
    );
  }
}
