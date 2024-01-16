import db from "@/db";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const revalidate = 0;
export async function GET(req) {
  const { userId } = auth();

  try {
    await db.connectDb();

    // Fetch all orders for the user
    const orders = await OrderModel.find({ userId });
    const topSellingProducts = await ItemModel.find({ userId })
      .sort({ soldUnits: -1 }) // Sort in descending order based on soldUnits
      .limit(10); // Limit the result to the top 10 products

    // Calculate the sum of the total amounts
    const totalSum = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Format totalSum to have only two decimal places
    const formattedTotalSum = Number(totalSum.toFixed(2));

    // Get the total count of orders
    const totalCount = orders.length;

    return NextResponse.json({
      status: 200,
      data: {
        totalSum: formattedTotalSum,
        totalCount,
        topSellingProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({
      status: 500,
      data: { error: "Internal Server Error" },
    });
  } finally {
    db.disconnectDb();
  }
}
