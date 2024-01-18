"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import AdminItems from "@/components/AdminItems";
import AdminItemFilter from "../../../components/AdminItemFilter";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";

import toast from "react-hot-toast";

export default function AdminProducts() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const selectedProducts = useCartStore((state) => state.selectedProducts);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const { clearAdminItems, setAdminItems } = useCartStore();

  useEffect(() => {
    setMounted(true);

    getAllItems();
  }, []);

  const getAllItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/getAllItems", {
        method: "GET",
      });

      const response = await res.json();
      const items = response.data;
      clearAdminItems();
      setAllItems(items);

      // Filter items based on selected status
      const filtered = filterItemsByStatus(items, selectedStatus);
      setFilteredItems(filtered);

      // Update state used by other components
      setAdminItems(filtered);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterItemsByStatus = (items, status) => {
    if (status === "published") {
      return items.filter((item) => item.published === "published");
    } else if (status === "unpublished") {
      return items.filter((item) => item.published === "unpublished");
    } else {
      return items;
    }
  };

  const filterOrdersByStatus = (status) => {
    setSelectedStatus(status);

    // Filter items based on selected status
    const filtered = filterItemsByStatus(allItems, status);
    setFilteredItems(filtered);

    // Update state used by other components
    setAdminItems(filtered);
  };

  if (!mounted) {
    return "";
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <AdminItemFilter onSelectStatus={filterOrdersByStatus} />
      {selectedProducts.length > 0 ? (
        <Button className="block relative">filter</Button>
      ) : null}
      <div className="flex items-center justify-evenly gap-2 p-2">
        {filteredItems.map((item, index) => (
          <AdminItems
            key={item._id}
            item={item}
            selectedStatus={selectedStatus}
          />
        ))}
      </div>
    </div>
  );
}
