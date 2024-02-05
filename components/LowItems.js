import React, { useEffect, useState } from "react";
import useCartStore from "@/cartStore";

export default function LowItems() {
  const { adminItems } = useCartStore();
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    // Calculate the low stock count when adminItems change
    const lowStockItems = adminItems.filter((item) => item.stock < 5);
    setLowStockCount(lowStockItems.length);
  }, [adminItems]);

  return (
    <div
      className={
        lowStockCount === 0
          ? "hidden"
          : "flex items-center justify-center h-6 w-6 rounded-full bg-black text-red-500"
      }
    >
      <span className="text-sm">{lowStockCount}</span>
    </div>
  );
}
