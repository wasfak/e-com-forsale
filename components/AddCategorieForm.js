"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddItemForm = ({ onSubmit, getCate }) => {
  const [inputValues, setInputValues] = useState([""]);
  const [action, setAction] = useState("add"); // State to track user's choice

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleRemoveInput = (index) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the input values and action to the parent component
    onSubmit({ inputValues, action });

    setInputValues([""]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-xl border-2"
    >
      {inputValues.map((value, index) => (
        <div key={index} className="mb-4 flex">
          <input
            type="text"
            id={`inputValue_${index}`}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-800"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {index > 0 && (
            <button
              type="button"
              className="ml-2  bg-red-500 text-white px-1 text-sm rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              onClick={() => handleRemoveInput(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between w-full">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 mt-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Submit
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="rounded-md text-black"
            onClick={handleAddInput}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <label>
          <input
            type="radio"
            name="action"
            value="add"
            checked={action === "add"}
            onChange={() => setAction("add")}
            className="text-sm"
          />
          Add to existing categories
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="action"
            value="replace"
            checked={action === "replace"}
            onChange={() => setAction("replace")}
            className="text-sm"
          />
          Replace existing categories
        </label>
      </div>
    </form>
  );
};

export default AddItemForm;
