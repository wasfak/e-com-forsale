import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { userId } = auth();
  const { categories, selectedProducts, action } = body; // selectedProducts are assumed to be an array of itemId

  try {
    await db.connectDb();

    await Promise.all(
      selectedProducts.map(async (itemId) => {
        const item = await ItemModel.findOne({ _id: itemId, userId });
        if (item) {
          if (action === "add") {
            item.categories = [...new Set([...item.categories, ...categories])];
          } else if (action === "remove") {
            item.categories = item.categories.filter(
              (cat) => !categories.includes(cat)
            );
          }
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
