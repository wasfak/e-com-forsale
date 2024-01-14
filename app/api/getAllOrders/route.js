import db from "@/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OrderModel from "@/models/ordersSchema";

export const GET = async (req) => {
  const { userId } = auth();

  try {
    await db.connectDb();

    const data = await OrderModel.find({ userId });

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
