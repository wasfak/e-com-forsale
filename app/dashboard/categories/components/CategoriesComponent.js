"use client";
import { useState, useEffect } from "react";
import { Loader } from "@/components/Loader";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function CategoriesComponent({ category, getCate }) {
  const [loading, setIsLoading] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateCate = async () => {
    setIsLoading(true);
    const updatedCategoryList = [...category.name]; // Copy the existing category list
    updatedCategoryList[editModeIndex] = editedCategory; // Update the specific category being edited

    const res = await fetch("/api/getCate", {
      method: "POST",
      body: JSON.stringify({ updatedCategoryList }),
    });
    const response = await res.json();
    await getCate();
    setIsLoading(false);
  };

  const deleteCate = async (index) => {
    setIsLoading(true);
    const res = await fetch("/api/getCate", {
      method: "DELETE",
      body: JSON.stringify({ index }),
    });
    const response = await res.json();
    await getCate();
    setIsLoading(false);
  };

  const handleEditClick = (index) => {
    setEditModeIndex(index);
    setEditedCategory(category.name[index]);
  };

  const handleSaveClick = async () => {
    await updateCate();
    setEditModeIndex(null);
  };

  const handleDeleteClick = (index) => {
    setEditModeIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteCate(editModeIndex);
    setEditModeIndex(null);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setEditModeIndex(null);
    setShowDeleteModal(false);
  };

  if (loading) {
    return <Loader className="mt-10" />;
  }

  return (
    <div className="shadow-xl border-2 rounded-lg bg-white w-1/2 p-6 mt-6">
      <div className="mb-4 text-lg font-bold">Category</div>
      {category && (
        <div className="flex flex-col">
          {category.name.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-black p-2 rounded-md"
            >
              {editModeIndex === index ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                    className="mr-2 border rounded-md p-1 font-bold"
                  />
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-inter">{name}</span>
                  <div>
                    <button
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
