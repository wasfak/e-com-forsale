"use client";

import useCartStore from "@/cartStore";
import { useEffect, useState } from "react";
import { FormatDate, extractLastPart } from "../../../../utils/helpers";

export default function OrderDetailPage({ params }) {
  const [mounted, setMounted] = useState(false);
  const { id } = params;

  const orders = useCartStore((state) => state.orders);
  const order = orders.find((order) => order.id === id);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  // Splitting the address into parts
  const addressParts =
    order?.address?.split(",").map((part) => part.trim()) || [];

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      {order ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
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
        </div>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
}
