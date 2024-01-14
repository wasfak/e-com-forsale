"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import ZustOrdersList from "../../../components/ZustOrdersList";
import AdminBar from "../../../components/AdminBar";

export default function AdminOrders() {
  const [mounted, setMounted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { clearOrders, setAdminItems } = useCartStore();

  useEffect(() => {
    setMounted(true);

    AllOrders();
  }, []);

  const AllOrders = async () => {
    const res = await fetch("/api/getAllOrders", {
      method: "GET",
    });

    const response = await res.json();
    const orders = response.data;
    useCartStore.getState().setOrders([]);
    useCartStore.getState().setOrders(orders);
  };

  const filterOrdersByStatus = (status) => {
    setSelectedStatus(status);
  };

  if (!mounted) {
    return "";
  }

  return (
    <>
      <AdminBar onSelectStatus={filterOrdersByStatus} />
      <div className="flex flex-col gap-y-2 justify-center items-start">
        <ZustOrdersList selectedStatus={selectedStatus} />
      </div>
    </>
  );
}
