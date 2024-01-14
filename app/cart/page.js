"use client";

import useCartStore from "@/cartStore"; // Ensure this path is correct
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";
export default function CartPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const { items, increase, decrease, removeItem, clearCart } = useCartStore(
    (state) => ({
      items: state.items,
      increase: state.increase,
      decrease: state.decrease,
      removeItem: state.removeItem, // Ensure this matches the method name in your store
      totalSum: state.totalSum,
      clearCart: state.clearCart,
    })
  );

  useEffect(() => {
    setMounted(true);
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      /* clearCart(); */
    }
    if (searchParams.get("canceled")) {
      toast.success("Something went wrong.");
    }
  }, [searchParams, clearCart]);

  // Calculate the total sum
  const total = items.reduce(
    (total, item) => total + item.priceAfterSale * (item.quantity || 1),
    0
  );

  const onCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST", // Method type
        headers: {
          "Content-Type": "application/json", // Indicate the content type
        },
        body: JSON.stringify({
          productIds: items.map((item) => ({
            itemId: item._id,
            quantity: item.quantity,
          })), // Your request body
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json(); // Parse JSON response into JavaScript object
      window.location = data.url; // Navigate to the URL from the response
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Error during checkout."); // Display some error message
    }
  };

  if (!mounted) {
    return "";
  }
  return (
    <>
      {items.length === 0 ? (
        <div className="text-center py-10">Your cart is empty.</div>
      ) : (
        <div className="container mx-auto py-8 ">
          <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
          <div className="flex items-center justify-between">
            <div className="space-y-4 w-2/3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white p-4 rounded-md shadow"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      {item.discountType !== "none" ? (
                        <p className="text-gray-600">${item.priceAfterSale}</p>
                      ) : (
                        <p className="text-gray-600">${item.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrease(item)}
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => increase(item)}
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right ">
              <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
              <button
                disabled={items.length === 0}
                onClick={onCheckout}
                className=" mt-6  w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
