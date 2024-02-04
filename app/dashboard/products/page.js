"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import AdminItems from "@/components/AdminItems";
import AdminItemFilter from "../../../components/AdminItemFilter";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";

import toast from "react-hot-toast";
import ProductsActions from "@/components/ProductsActions";

export default function AdminProducts() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const selectedProducts = useCartStore((state) => state.selectedProducts);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItemsChecked, setAllItemsChecked] = useState(false);

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

  const handleSelectAll = () => {
    const allProductIds = allItems.map((item) => item._id);

    // Update selectedProducts state
    useCartStore.setState({ selectedProducts: allProductIds });

    // Update isChecked state for each item
    setFilteredItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isChecked: true }))
    );

    // Update the state to indicate all items are checked
    setAllItemsChecked(true);
  };

  const handleUncheckAll = () => {
    // Clear selectedProducts state
    useCartStore.setState({ selectedProducts: [] });

    // Update isChecked state for each item
    setFilteredItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isChecked: false }))
    );

    // Update the state to indicate none of the items are checked
    setAllItemsChecked(false);
  };

  const handleToggleAll = () => {
    if (allItemsChecked) {
      handleUncheckAll();
    } else {
      handleSelectAll();
    }
  };

  if (!mounted) {
    return "";
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto bg-[#F8F8FF] h-[100vh]">
      <AdminItemFilter onSelectStatus={filterOrdersByStatus} className="mb-8" />
      <ProductsActions className="mb-12" />
      <Button onClick={handleToggleAll} className="mt-4">
        {allItemsChecked ? "Uncheck All" : "Select All"}
      </Button>
      <div className="flex flex-wrap items-center justify-evenly gap-2 p-2 mt-14">
        {filteredItems.map((item, index) => (
          <AdminItems
            key={item._id}
            item={item}
            selectedStatus={selectedStatus}
            setFilteredItems={setFilteredItems}
          />
        ))}
      </div>
    </div>
  );
}
