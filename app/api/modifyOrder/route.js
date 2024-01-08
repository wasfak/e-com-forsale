import db from "@/db";
import OrderModel from "@/models/ordersSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const orderId = body;

  try {
    await db.connectDb();
    const item = await OrderModel.findOneAndUpdate(
      { id: orderId },
      { status: "finished" },
      { new: true }
    );
    console.log(item);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ status: 200, message: "Modified Successfully!!" });
}
