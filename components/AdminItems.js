"use client";
import { useState } from "react";
import useCartStore from "@/cartStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export default function AdminItems({ item, selectedStatus }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMenuItemClick = (action) => {
    // Perform actions based on the clicked menu item
    console.log(`Clicked on ${action}`);
    // Close the dropdown after clicking on an item
    setDropdownVisible(false);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-between w-[300px] h-[320px] gap-y-2 p-4 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out ">
        <div
          className="mb-2"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image
            alt={item.name}
            src={item.imageUrl}
            layout="fill"
            objectFit="fill"
            className="rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <p className="text-gray-600">{`$${item.priceAfterSale}`}</p>
        </div>
        <span className="text-md text-gray-500 overflow-ellipsis mb-2 w-full">
          Units sold: {item.soldUnits}
        </span>
        <div className="">
          <SettingsIcon
            className="w-6 h-6 text-black mt-2 absolute top-0 right-1 cursor-pointer"
            onClick={toggleDropdown}
          />
          <input
            type="checkbox"
            name="check"
            id="check"
            className="w-4 h-4 absolute top-2 left-1"
          />
          {dropdownVisible && (
            <div className=" bg-white border border-gray-300 rounded-md shadow-md absolute top-6 right-3 cursor-pointer flex flex-col items-center justify-evenly  h-auto">
              <ul className="list-none p-2">
                <li>
                  <button onClick={() => handleMenuItemClick("edit")}>
                    <p className="text-sm text-gray-500 overflow-ellipsis mb-2">
                      Edit
                    </p>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMenuItemClick("view")}>
                    <p className="text-sm text-gray-500 overflow-ellipsis mb-2">
                      View
                    </p>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMenuItemClick("share")}>
                    <p className="text-sm text-gray-500 overflow-ellipsis mb-2">
                      Share
                    </p>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMenuItemClick("delete")}>
                    <p className="text-sm text-red-500 overflow-ellipsis mb-2">
                      Delete
                    </p>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMenuItemClick("unpublish")}>
                    <p className="text-sm text-gray-500 overflow-ellipsis mb-2">
                      Unpublish
                    </p>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
