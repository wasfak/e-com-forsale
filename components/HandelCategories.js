"use client";
import { useState, useEffect } from "react";
import useCartStore from "@/cartStore";
import { Button } from "./ui/button";

export default function HandelCategories() {
  const { categories, selectedProducts } = useCartStore();
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    // Initialize the state with all categories set to false
    const initialCategoryState = {};
    categories.forEach((category, index) => {
      initialCategoryState[`category-${index}`] = false;
    });
    setSelectedCategories(initialCategoryState);
  }, [categories]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async () => {
    // Prepare the data to be sent
    const dataToSend = Object.keys(selectedCategories)
      .filter((key) => selectedCategories[key])
      .map((key) => categories[parseInt(key.split("-")[1], 10)]);
    console.log(dataToSend);
    console.log(selectedProducts);

    // Send data to the database
    // Example: POST request using fetch
    const response = await fetch("/api/updateCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categories: dataToSend, selectedProducts }), // Send as an object
    });
    if (!response.ok) {
      console.error("Error saving categories");
      return;
    }

    console.log("Categories saved successfully");
    // Handle further actions upon successful save
  };

  return (
    <div className="flex flex-col w-full p-2 shadow-2xl rounded-xl bg-black text-white">
      <div className="flex flex-row flex-nowrap overflow-x-auto">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mr-4 flex-nowrap">
            <input
              type="checkbox"
              id={`category-${index}`}
              className="mr-2"
              onChange={handleCheckboxChange}
              checked={selectedCategories[`category-${index}`] || false}
            />
            <label
              htmlFor={`category-${index}`}
              className="text-sm whitespace-nowrap"
            >
              {category}
            </label>
          </div>
        ))}
        <Button
          onClick={handleSubmit}
          className="ml-4  text-white rounded text-sm"
          size="sm"
        >
          Add
        </Button>
        <Button
          onClick={handleSubmit}
          className="ml-4  text-white rounded text-sm"
          size="sm"
          variant="destructive"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
