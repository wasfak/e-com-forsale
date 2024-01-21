"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
export default function AdminItemFilter({ onSelectStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    onSelectStatus(status);
  };

  const isSelected = (status) => selectedStatus === status;

  return (
    <div className="relative flex items-center justify-between text-white p-4  rounded-2xl mx-4 mt-2 w-[700px] ">
      <Button
        className={isSelected(null) ? "bg-white text-black" : ""}
        onClick={() => handleSelectStatus(null)}
      >
        <span className="">All</span>
      </Button>
      <Button
        className={isSelected("published") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("published")}
      >
        <span className="">Published</span>
      </Button>
      <Button
        className={isSelected("unpublished") ? "bg-blue-500" : ""}
        onClick={() => handleSelectStatus("unpublished")}
      >
        <span className="">UnPublished</span>
      </Button>
      <div className="absolute top-4 -right-80 flex items-center justify-between w-[180px] bg-black p-3 shadow-2xl">
        <FaPlus />
        <Link href="/UploadPage" className="text-white">
          Add new product
        </Link>
      </div>
    </div>
  );
}
