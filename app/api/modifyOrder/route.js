import db from "@/db";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const orderId = body;

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

    let newStatus;

    // Check the current status and update accordingly
    if (order.status === "new") {
      newStatus = "processing";
    } else if (order.status === "processing") {
      newStatus = "finished";
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid order status",
      });
    }

    // Update the order status
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { id: orderId },
      { status: newStatus },
      { new: true }
    );

    for (const orderItem of updatedOrder.orderItems) {
      const { itemId, quantity } = orderItem;

      // Find the item and update its soldUnits
      await ItemModel.findOneAndUpdate(
        { _id: itemId },
        { $inc: { soldUnits: quantity } }
      );
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
