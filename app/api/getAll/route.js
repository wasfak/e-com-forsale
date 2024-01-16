import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
export const revalidate = 0;
export const GET = async (req) => {
  const { userId } = auth();

  try {
    await db.connectDb();

    const data = await ItemModel.find({ userId });

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
