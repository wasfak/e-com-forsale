import db from "@/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OrderModel from "@/models/ordersSchema";
export const revalidate = 0;
export const GET = async (req) => {
  const { userId } = auth();

  try {
    await db.connectDb();

    const data = await OrderModel.find({ userId }).sort({ createdAt: -1 });

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
