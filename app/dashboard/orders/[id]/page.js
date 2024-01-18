"use client";

import useCartStore from "@/cartStore";
import { useEffect, useState } from "react";
import { FormatDate, extractLastPart } from "../../../../utils/helpers";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import OrderItem from "../components/OrderItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderDetailPage({ params }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  const router = useRouter();
  const { id } = params;

  const orders = useCartStore((state) => state.orders);
  const order = orders.find((order) => order.id === id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedStatus, setSelectedStatus] = useState(order?.status);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShow(false);
  };

  const handleStatusUpdate = async () => {
    try {
      // Update the order status
      const res = await fetch("/api/modifyOrder", {
        method: "POST",
        body: JSON.stringify({
          orderId: order.id,
          newStatus: selectedStatus,
        }),
      });
      const response = await res.json();
      toast.success(response.message);
      router.replace("/dashboard/orders");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

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
          <h2 className="text-lg font-bold my-2">Order Items</h2>
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
          <p>
            Order state:
            <Select>
              <SelectTrigger className="w-[180px]">
                {/* Use the state variable for the Select component value */}
                <SelectValue
                  placeholder={selectedStatus}
                  onClick={() => setShow(true)}
                />
              </SelectTrigger>
              {show && (
                <SelectContent>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleStatusChange("processing")}
                  >
                    Processing
                  </div>
                  <div
                    className="cursor-pointer border-t"
                    onClick={() => handleStatusChange("finished")}
                  >
                    Finished
                  </div>
                  <div
                    className="cursor-pointer border-t"
                    onClick={() => handleStatusChange("new")}
                  >
                    New
                  </div>
                  <div
                    className="cursor-pointer border-t"
                    onClick={() => handleStatusChange("Canceled")}
                  >
                    Canceled
                  </div>
                </SelectContent>
              )}
            </Select>
          </p>
          <div className="flex items-center justify-between w-full">
            <Button onClick={handleStatusUpdate} className="mt-2">
              Update Status
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
