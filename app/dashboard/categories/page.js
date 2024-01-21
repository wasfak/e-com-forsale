"use client";

import AddItemForm from "@/components/AddCategorieForm";
import React from "react";
import toast from "react-hot-toast";
import CategoriesComponent from "./components/CategoriesComponent";

export default function CategoriesPage() {
  const handleAddItem = async ({ inputValues, action }) => {
    // Now sending both inputValues and action to the backend
    const res = await fetch("/api/catego", {
      method: "POST",
      body: JSON.stringify({ inputValues, action }), // Send both inputValues and action
    });

    const response = await res.json();
    if (response.status === 200) {
      toast.success(response.message);
      console.log(response.data);
    } else {
      toast.error("An error occurred"); // Using toast for error messages
      console.error("Error:", response.message);
    }
  };

  return (
    <div className="p-12">
      <AddItemForm onSubmit={handleAddItem} />
      <CategoriesComponent />
    </div>
  );
}
