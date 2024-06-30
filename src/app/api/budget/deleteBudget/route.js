import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function DELETE(req) {
  try {
    await connectToDb();

    const userId = req.nextUrl.searchParams.get("userId");
    const budgetId = req.nextUrl.searchParams.get("budgetId");
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const budgetIndex = user.Budget.findIndex(
      (budget) => budget._id.toString() === budgetId
    );

    if (budgetIndex === -1) {
      return NextResponse.json(
        { message: "Budget not found for deletion" },
        { status: 404 }
      );
    }
    user.Budget.splice(budgetIndex, 1);
    await user.save();
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting budget data:", error);
    return NextResponse.json(
      { message: "Error while deleting budget data" },
      { status: 500 }
    );
  }
}
