import db from "@/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import CategoryModel from "@/models/Category";
export const revalidate = 0;
export const GET = async (req) => {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ status: 400, message: "NO USER" });
  }

  try {
    await db.connectDb();

    const data = await CategoryModel.find({ userId });

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    db.disconnectDb();
  }
};

export const POST = async (req) => {
  const { userId } = auth();
  const { updatedCategoryList } = await req.json();

  if (!userId) {
    return NextResponse.json({ status: 400, message: "NO USER" });
  }

  try {
    await db.connectDb();

    // Assuming your CategoryModel has a structure similar to { userId, name: [] }
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { userId },
      { $set: { name: updatedCategoryList } },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ status: 404, message: "Category not found" });
    }

    return NextResponse.json({ status: 200, data: [updatedCategory] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    db.disconnectDb();
  }
};

export const DELETE = async (req) => {
  const { userId } = auth();
  const { index } = await req.json();

  if (!userId) {
    return NextResponse.json({ status: 400, message: "NO USER" });
  }

  try {
    await db.connectDb();

    // Assuming your CategoryModel has a structure similar to { userId, name: [] }
    const existingCategory = await CategoryModel.findOne({ userId });

    if (!existingCategory) {
      return NextResponse.json({ status: 404, message: "Category not found" });
    }

    // Remove the category at the specified index
    existingCategory.name.splice(index, 1);

    // Save the updated category
    const updatedCategory = await existingCategory.save();

    return NextResponse.json({ status: 200, data: [updatedCategory] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    await db.disconnectDb();
  }
};
