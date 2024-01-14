import db from "@/db";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const orderId = body;

  try {
    await db.connectDb();
    const order = await OrderModel.findOneAndUpdate(
      { id: orderId },
      { status: "finished" },
      { new: true }
    );

    for (const orderItem of order.orderItems) {
      const { itemId, quantity } = orderItem;

      // Find the item and update its soldUnits
      await ItemModel.findOneAndUpdate(
        { _id: itemId },
        { $inc: { soldUnits: quantity } }
      );
    }
    console.log(order.orderItems);
    return NextResponse.json({
      status: 200,
      message: "Modified Successfully!!",
    });
  } catch (error) {
    console.log(error);
  } finally {
    db.disconnectDb();
  }
}
