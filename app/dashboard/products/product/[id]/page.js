"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";
export default function ProductPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState({
    name: "",
    details: "",
    price: "",
    isOnSale: false,
    imageUrl: "",
    discountType: "null",
    discountPercentage: "null",
    discountAmount: "null",
  });

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    setMounted(true);
    getItem();
  }, []);

  const getItem = async () => {
    setLoading(true);
    const response = await fetch("/api/getItem", {
      method: "POST",
      body: JSON.stringify(id),
    });

    const res = await response.json();
    if (res.status === 200) {
      setItem(res.data);
      setLoading(false);
      console.log(res.data);
    }
  };
  if (!mounted) {
    return "";
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="relative mx-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-lg bg-white hover:shadow-neo transition-shadow duration-300">
        <Link
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          href="/"
          as={"image"}
        >
          <Image
            className="object-cover"
            alt={`Image of ${item.name}`}
            src={item.imageUrl}
            width={500}
            height={300}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* If you have a discount or special offer, you can uncomment this */}

          {item.discountPercentage ? (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {item.discountPercentage}% OFF
            </span>
          ) : null}
        </Link>
        <div className="mt-4 px-5 pb-5">
          <Link href="/" as={"image"}>
            <h5 className="text-xl tracking-tight text-slate-900 capitalize">
              {item.name}
            </h5>
          </Link>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <span>
              {item.discountType !== "none" ? (
                <div>
                  <span className="text-xl font-bold text-slate-900">
                    ${item.priceAfterSale}
                  </span>
                  <span className="text-sm line-through text-red text-red-500">
                    ${item.price}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-slate-900">
                  ${item.price}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => addItem(item)}
            className="flex items-center text-white justify-center rounded-md bg-[#5d6bc4] px-5 py-2.5 text-center text-sm font-medium  hover:bg-[#ff7b7b] focus:outline-none focus:ring-4 focus:ring-blue-300 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
