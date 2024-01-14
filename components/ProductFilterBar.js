// ProductFilterBar.js
"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ProductFilterBar({ onSelectStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    onSelectStatus(status);
  };

  const isSelected = (status) => selectedStatus === status;

  return (
    <div className="flex items-center justify-between text-white p-4 shadow-2xl rounded-2xl mx-4 mt-2 w-[700px]">
      <Button
        className={isSelected(null) ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus(null)}
      >
        All
      </Button>
      <Button
        className={isSelected("available") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("available")}
      >
        Available
      </Button>
      <Button
        className={isSelected("outOfStock") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("outOfStock")}
      >
        Out of Stock
      </Button>
      <Button
        className={isSelected("onSale") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("onSale")}
      >
        On Sale
      </Button>
      {/* Add more status buttons as needed */}
    </div>
  );
}
