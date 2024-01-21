import db from "@/db";
import CategoryModel from "@/models/Category";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId } = auth();
  const body = await req.json();
  const { inputValues, action } = body; // Extract action along with inputValues

  if (!userId) {
    return NextResponse.json({ status: 400, message: "No User" });
  }

  if (!inputValues) {
    return NextResponse.json({ status: 400, message: "No categories sent" });
  }

  await db.connectDb();

  try {
    let category = await CategoryModel.findOne({ userId });

    if (category) {
      // Check the user's action (add or replace)
      if (action === "replace") {
        category.name = inputValues; // Replace the existing names
      } else {
        // Default to 'add' if action is not 'replace'
        category.name.push(...inputValues); // Add to existing names
      }
      await category.save();
    } else {
      // If category does not exist, create a new one
      category = await CategoryModel.create({
        name: inputValues,
        userId,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Category updated/created successfully",
      data: category,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  } finally {
    await db.disconnectDb();
  }
};
