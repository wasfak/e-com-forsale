"use client";
import { useEffect, useState } from "react";

export default function OrdersAnPage({ visitors }) {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/orderData", {
        method: "GET",
      });

      if (res.ok) {
        const response = await res.json();
        const { totalSum, totalCount, topSellingProducts } = response.data;

        setTotalSales(totalSum);
        setTotalOrders(totalCount);
        setTopSellingProducts(topSellingProducts);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-lg my-2">Total Sales: ${totalSales.toFixed(2)}</p>
          <p className="text-lg my-2">Total Orders: {totalOrders}</p>
          <p className="text-lg my-2">
            Conversion rate: {((totalOrders / visitors) * 100).toFixed(2)}%
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          {topSellingProducts.length > 0 ? (
            <ul className="list-disc pl-4">
              {topSellingProducts
                .filter((product) => product.soldUnits > 0)
                .map((product) => (
                  <li key={product._id} className="text-sm mb-2">
                    {product.name} - Sold Units: {product.soldUnits}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-lg">No items sold yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
