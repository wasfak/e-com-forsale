import db from "@/db";
import { stripe } from "@/lib/stripe";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  try {
    const { productIds } = await req.json();

    const { userId } = auth();
    const user = await currentUser();
    const userName = user?.firstName + " " + user?.lastName;
    const userMail = user?.emailAddresses?.[0]?.emailAddress;

    if (!productIds || productIds.length === 0) {
      return NextResponse("Product Ids Are Required", { status: 400 });
    }

    await db.connectDb();
    const orderItems = productIds.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
    }));

    const products = await ItemModel.find({
      _id: { $in: orderItems.map((orderItem) => orderItem.itemId) },
    });

    const lineItems = orderItems.map((orderItem) => {
      const product = products.find(
        (p) => p._id.toString() === orderItem.itemId.toString()
      );

      const unit_amount = Math.round(product.priceAfterSale * 100);

      return {
        quantity: orderItem.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: unit_amount,
        },
      };
    });

    const total = lineItems.reduce(
      (acc, lineItem) =>
        acc + (lineItem.quantity * lineItem.price_data.unit_amount) / 100,
      0
    );

    const order = new OrderModel({
      orderItems,
      isPaid: false,
      userId,
      total,
      userName,
      userMail,
    });
    await order.save();

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error in checkout route:", error);
    return NextResponse(`Server Error: ${error.message}`, { status: 500 });
  }
}
