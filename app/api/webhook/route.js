import db from "@/db";
import { stripe } from "@/lib/stripe";
import OrderModel from "@/models/ordersSchema";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("start the req!!!!!");
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`WebHook Error:${error.message}`, { status: 400 });
  }

  const session = event.data.object;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");
  if (event.type === "checkout.session.completed") {
    await db.connectDb();

    const orderId = session?.metadata?.orderId;

    const orderUpdate = {
      $set: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
        status: "new",
      },
    };

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { id: orderId },
      orderUpdate,
      { new: true }
    );

    if (!updatedOrder) {
      console.error(`Order with ID ${orderId} not found.`);
      return new NextResponse(`Order Not Found`, { status: 404 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
