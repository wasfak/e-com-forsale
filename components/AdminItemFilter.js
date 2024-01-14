"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function AdminItemFilter({ onSelectStatus }) {
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
        className={isSelected("published") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("published")}
      >
        Published
      </Button>
      <Button
        className={isSelected("unpublished") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("unpublished")}
      >
        Unpublished
      </Button>
    </div>
  );
}
