"use client";
import useCartStore from "@/cartStore";
import { useState, useEffect } from "react";

export default function CartModal() {
  const [mounted, setMounted] = useState(false);
  const { items, totalSum } = useCartStore((state) => ({
    items: state.items,
    totalSum: state.totalSum,
  }));
  const total = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the modal if it's mounted and there are items in the cart
  if (!mounted || items.length === 0) {
    return null; // Return null or an empty fragment (<> </>) if you prefer
  }

  return (
    <div className="w-full bg-[#6495ED] h-8 flex  items-center justify-center capitalize fixed bottom-0 left-0 px-4 py-2 shadow-lg font-sriracha text-black">
      You have {items.length} items in your cart. Total: ${total.toFixed(2)}
    </div>
  );
}
