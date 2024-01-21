"use client";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";

export default function CategoriesComponent() {
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
    console.log(response.data);
    setCategory(response.data[0]); // Assuming there is only one object in the array
    setIsLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="shadow-xl rounded-lg bg-white w-1/2 p-6 mt-6">
      <div className="mb-4 text-lg font-bold">Category</div>
      {category && (
        <div className="flex flex-col">
          {category.name.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-black p-2 rounded-md"
            >
              <span>{name}</span>
              <div>
                <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Edit
                </button>
                <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
