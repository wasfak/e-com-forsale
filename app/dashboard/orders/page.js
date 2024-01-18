"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import ZustOrdersList from "../../../components/ZustOrdersList";
import AdminBar from "../../../components/AdminBar";
import { Loader } from "@/components/Loader";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [mounted, setMounted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { clearOrders, setAdminItems } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const AllOrders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/getAllOrders", {
          method: "GET",
        });
        const response = await res.json();
        const orders = response.data;
        useCartStore.getState().setOrders([]);
        useCartStore.getState().setOrders(orders);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!selectedStatus) {
      AllOrders();
    }
  }, [selectedStatus]);

  const filterOrdersByStatus = (status) => {
    setSelectedStatus(status);
  };

  if (!mounted) {
    return "";
  }

  if (isLoading) {
    return <Loader />;
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
