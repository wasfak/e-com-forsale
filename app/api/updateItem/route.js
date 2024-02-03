import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await db.connectDb();

    // Get userId from authentication library (replace with your actual implementation)
    const { userId } = auth();

    // Get data and id from the request body
    const { data, id } = await req.json();

    // Find the item by id and userId
    const currentItem = await ItemModel.findOne({ _id: id, userId });

    if (!currentItem) {
      return NextResponse.json({ status: 404, message: "Item not found" });
    }

    // Update the item with new data
    currentItem.set(data);

    // Save the updated item
    await currentItem.save();

    return NextResponse.json({
      status: 200,
      message: "Item updated successfully",
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
};
