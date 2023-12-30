import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const POST = async (req) => {
  const body = await req.json();
  const { userId } = auth();

  const {
    name,
    details,
    price,
    isOnSale,
    imageUrl,
    discountType,
    discountPercentage,
    discountAmount,
  } = body;

  try {
    await db.connectDb();

    // Handle empty discountType or undefined discountType
    const validDiscountType = discountType || "none";

    const newItem = new ItemModel({
      name,
      details,
      price,
      isOnSale,
      imageUrl,
      discountType: validDiscountType,
      discountPercentage,
      discountAmount,
      userId,
    });

    // Save the item to the database
    await newItem.save();

    return NextResponse.json({ status: 200, message: "True" });
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
