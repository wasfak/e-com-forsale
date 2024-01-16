"use client";

import useCartStore from "@/cartStore";
import { useEffect, useState } from "react";
import { FormatDate, extractLastPart } from "../../../../utils/helpers";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import OrderItem from "../components/OrderItem";

export default function OrderDetailPage({ params }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { id } = params;

  const orders = useCartStore((state) => state.orders);
  const order = orders.find((order) => order.id === id);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  const handelModify = async () => {
    const res = await fetch("/api/modifyOrder", {
      method: "POST",
      body: JSON.stringify(order.id),
    });
    const response = await res.json();
    toast.success(response.message);
    router.replace("/dashboard/orders");
  };

  // Splitting the address into parts
  const addressParts =
    order?.address?.split(",").map((part) => part.trim()) || [];

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      {order ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <h2 className="text-lg font-bold my-2">Order Items:</h2>
          <div>
            {order.orderItems.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </div>
          <p>Order ID: {extractLastPart(order.id)}</p>
          <p>Order Date: {FormatDate(order.createdAt)}</p>
          <p>User Name: {order.userName}</p>
          <div>
            <p className="font-bold">Address:</p>
            {addressParts.map((part, index) => (
              <p key={index}>{part}</p>
            ))}
          </div>
          <p>Phone: {order.phone}</p>
          <p>Email: {order.userMail}</p>
          <p>Order state: {order.status}</p>
          <div className="flex items-center justify-between w-full">
            <Button onClick={handelModify} className="mt-2">
              {order.status === "new"
                ? "Progress"
                : order.status === "processing"
                ? "Finished"
                : "click"}
            </Button>
            <Button variant="destructive">Cancel Order</Button>
          </div>
        </div>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
}
