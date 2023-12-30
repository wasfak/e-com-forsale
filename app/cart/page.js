"use client";

import useCartStore from "@/cartStore"; // Ensure this path is correct
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, increase, decrease, removeItem, totalSum } = useCartStore(
    (state) => ({
      items: state.items,
      increase: state.increase,
      decrease: state.decrease,
      removeItem: state.removeItem, // Ensure this matches the method name in your store
      totalSum: state.totalSum,
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  // Calculate the total sum
  const total = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  if (items.length === 0) {
    return <div className="text-center py-10">Your cart is empty.</div>;
  }

  return (
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
                  <p className="text-gray-600">${item.price}</p>
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
        </div>
      </div>
    </div>
  );
}
