"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import AdminItems from "@/components/AdminItems";
import AdminItemFilter from "../../../components/AdminItemFilter";

export default function AdminProducts() {
  const [mounted, setMounted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const { clearAdminItems, clearOrders, setAdminItems } = useCartStore();

  useEffect(() => {
    setMounted(true);

    getAllItems();
  }, []);

  const getAllItems = async () => {
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

  return (
    <div className="container mx-auto py-8">
      <AdminItemFilter onSelectStatus={filterOrdersByStatus} />
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
