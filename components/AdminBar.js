"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function AdminBar({ onSelectStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    onSelectStatus(status);
  };

  const isSelected = (status) => selectedStatus === status;

  return (
    <div className="flex items-center justify-between text-white p-4 shadow-2xl rounded-2xl mx-4 w-[700px]">
      <Button
        className={isSelected(null) ? "bg-sky-500" : ""}
        onClick={() => handleSelectStatus(null)}
      >
        All
      </Button>
      <Button
        className={isSelected("new") ? "bg-sky-500" : ""}
        onClick={() => handleSelectStatus("new")}
      >
        New
      </Button>
      <Button
        className={isSelected("processing") ? "bg-sky-500" : ""}
        onClick={() => handleSelectStatus("processing")}
      >
        Processing
      </Button>
      <Button
        className={isSelected("finished") ? "bg-sky-500" : ""}
        onClick={() => handleSelectStatus("finished")}
      >
        Finished
      </Button>
      <Button
        className={isSelected("Canceled") ? "bg-sky-500" : ""}
        onClick={() => handleSelectStatus("Canceled")}
      >
        Canceled
      </Button>
    </div>
  );
}
