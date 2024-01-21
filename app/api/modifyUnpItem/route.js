import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = await auth();
  const body = await req.json();
  const { selectedProducts } = body;

  try {
    await db.connectDb();

    // Find the items based on the selected product IDs
    const itemsToUpdate = await ItemModel.find({
      userId,
      _id: { $in: selectedProducts },
    });

    // Check if any items were found
    if (!itemsToUpdate || itemsToUpdate.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No items found for the provided IDs",
      });
    }

    // Update the 'published' field for each item
    const updatedItems = await Promise.all(
      itemsToUpdate.map(async (item) => {
        const updatedItem = await ItemModel.findOneAndUpdate(
          { _id: item._id },
          { published: "unpublished" }, // Change to the desired value
          { new: true } // Return the modified document
        );

        return updatedItem;
      })
    );

    return NextResponse.json({
      status: 200,
      message: "Items updated successfully",
      updatedItems,
    });
  } catch (error) {
    console.error("Error updating items:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  } finally {
    db.disconnectDb();
  }
}
export async function DELETE(req) {
  const { userId } = await auth();
  const body = await req.json();
  const { selectedProducts } = body;

  try {
    await db.connectDb();

    // Delete the items based on the selected product IDs
    const deleteResult = await ItemModel.deleteMany({
      userId,
      _id: { $in: selectedProducts },
    });

    // Check if any items were deleted
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({
        status: 404,
        message: "No items found for the provided IDs",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Items deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting items:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  } finally {
    db.disconnectDb();
  }
}
