import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function GET(req, { params }) {
  console.log(params);
  const { id } = params;

  try {
    await connectToDb();

    const budgetDetails = await User.aggregate([
      {
        $match: { clerkId: id }, 
      },
      {
        $unwind: "$Budget",
      },
      {
        $unwind: "$Budget.budgets",
      },
      {
        $group: {
          _id: "$Budget.budgets._id",
          budgetName: { $first: "$Budget.budgets.budgetName" },
          budgetAmount: { $first: "$Budget.budgets.budgetAmount" },
          createdAt: { $first: "$Budget.budgets.createdAt" },
        },
      },
    ]);

    if (budgetDetails.length > 0) {
      return NextResponse.json({ budgetDetails }, { status: 200 });
    } else {
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching expense", error: error.message },
      { status: 500 }
    );
  }
}
