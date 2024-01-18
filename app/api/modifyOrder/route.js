import db from "@/db";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { orderId, newStatus } = body;
  console.log(newStatus);

  try {
    await db.connectDb();

    // Find the order
    const order = await OrderModel.findOne({ id: orderId });

    if (!order) {
      return NextResponse.json({
        status: 404,
        message: "Order not found",
      });
    }

    // Update the order status
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { id: orderId },
      { status: newStatus },
      { new: true }
    );

    if (newStatus === "finished") {
      // Only apply the logic when the order is changing to "finished"
      for (const orderItem of updatedOrder.orderItems) {
        const { itemId, quantity } = orderItem;

        // Find the item and update its soldUnits
        await ItemModel.findOneAndUpdate(
          { _id: itemId },
          { $inc: { soldUnits: quantity } }
        );
      }
    }

    return NextResponse.json({
      status: 200,
      message: `Order status updated to ${newStatus}`,
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
