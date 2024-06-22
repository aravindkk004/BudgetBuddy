import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const { id } = params;
    const user = await User.findOne({ "Budget._id": id });
    const budget = user.Budget.id(id);
    return NextResponse.json({ expenses: budget.budgets }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while Adding" },
      { status: 500 }
    );
  }
}
