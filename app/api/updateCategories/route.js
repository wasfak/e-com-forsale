import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { userId } = auth();
  const { categories, selectedProducts } = body; // selectedProducts are assumed to be an array of itemId

  try {
    await db.connectDb();

    // Update each product with new categories
    await Promise.all(
      selectedProducts.map(async (itemId) => {
        const item = await ItemModel.findOne({ _id: itemId, userId });
        if (item) {
          // Assuming categories is an array of ObjectId references to Category
          item.categories = [...new Set([...item.categories, ...categories])]; // Combines and deduplicates
          await item.save();
        }
      })
    );

    return NextResponse.json({
      status: 200,
      message: "Items updated with new categories",
    });
  } catch (error) {
    console.error("Error modifying order:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  } finally {
    db.disconnectDb();
  }
}
