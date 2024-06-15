"use server";
import User from "@/models/schema";
import { connectToDb } from "../connectToDb";

export async function createUser(user) {
  try {
    await connectToDb();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
