"use client";

import AddItemForm from "@/components/AddCategorieForm";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CategoriesComponent from "./components/CategoriesComponent";

export default function CategoriesPage() {
  const [category, setCategory] = useState(null);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    getCate();
  }, []);

  const getCate = async () => {
    setIsLoading(true);
    const res = await fetch("/api/getCate", {
      method: "GET",
    });
    const response = await res.json();

    setCategory(response.data[0]); // Assuming there is only one object in the array
    setIsLoading(false);
  };
  const handleAddItem = async ({ inputValues, action }) => {
    // Now sending both inputValues and action to the backend
    const res = await fetch("/api/catego", {
      method: "POST",
      body: JSON.stringify({ inputValues, action }), // Send both inputValues and action
    });

    const response = await res.json();
    if (response.status === 200) {
      /*  toast.success(response.message); */
      setCategory(response.data);
    } else {
      toast.error("An error occurred"); // Using toast for error messages
      console.error("Error:", response.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center">
      <CategoriesComponent category={category} getCate={getCate} />
      <AddItemForm
        onSubmit={handleAddItem}
        getCate={getCate}
        setCategory={setCategory}
      />
    </div>
  );
}
