"use client";
import React from "react";
import useCartStore from "@/cartStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
const extractLastPart = (fullId) => {
  const parts = fullId.split("-");
  return parts[parts.length - 1];
};

const ZZOrdersList = ({ selectedStatus }) => {
  const router = useRouter();
  const orders = useCartStore((state) => {
    if (!selectedStatus) {
      return state.orders;
    } else {
      return state.orders.filter((order) => order.status === selectedStatus);
    }
  });

  return (
    <div className="grid grid-cols-2 gap-4 p-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-2xl shadow-2xl p-4 w-[500px] my-2"
        >
          <h3 className="my-2">ID: {extractLastPart(order.id)}</h3>
          <h3 className="my-2">Date: {formatDate(order.createdAt)}</h3>
          <h3 className="my-2">Total: ${order.total}</h3>
          <h3 className="my-2">Status: {order.status}</h3>
          <Button onClick={() => router.push(`/dashboard/orders/${order.id}`)}>
            Details
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ZZOrdersList;
