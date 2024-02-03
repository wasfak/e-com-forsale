"use client";
import { useState } from "react";
import useCartStore from "@/cartStore";

import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [isChecked, setIsChecked] = useState(false);
  const selectedProducts = useCartStore((state) => state.selectedProducts);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMenuItemClick = async (action) => {
    if (action === "share" && navigator.share) {
      try {
        await navigator.share({
          title: "Your Item Title",
          text: "Check out this amazing item!",
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      console.log("Web Share API not supported");
      // Implement your custom share logic here for unsupported browsers (e.g., open a modal with share options)
    }

    // Perform actions based on the clicked menu item
    console.log(`Clicked on ${action}`);
    // Close the dropdown after clicking on an item
    setDropdownVisible(false);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // Save or use the product ID in your state management system
    const productId = item._id;

    if (!isChecked) {
      // Product is checked, add the product ID to the selectedProducts array
      useCartStore.setState((state) => ({
        selectedProducts: [...state.selectedProducts, productId],
      }));
    } else {
      // Product is unchecked, remove the product ID from the selectedProducts array
      useCartStore.setState((state) => ({
        selectedProducts: state.selectedProducts.filter(
          (selectedProductId) => selectedProductId !== productId
        ),
      }));
    }
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
            fill
            className="rounded-xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <p className="text-gray-600">{`$${item.priceAfterSale}`}</p>
        </div>
        <span className="text-md text-gray-500 overflow-ellipsis mb-2 w-full">
          Units sold: {item.soldUnits}
        </span>
        <div className="text-md text-gray-500 overflow-ellipsis mb-2 w-full flex gap-x-2">
          {item.categories.map((catego, index) => (
            <span
              key={index}
              className="flex items-center justify-center p-2 rounded-lg bg-[#303179] text-white"
            >
              {catego}
            </span>
          ))}
        </div>
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
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {dropdownVisible && (
            <div className=" bg-white border border-gray-300 rounded-md shadow-md absolute top-6 right-3 cursor-pointer flex flex-col items-center justify-evenly  h-auto">
              <ul className="list-none p-2">
                <li>
                  <button
                    onClick={() =>
                      router.push(`/dashboard/products/${item._id}`)
                    }
                  >
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
