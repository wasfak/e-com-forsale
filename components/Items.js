"use client";
import Image from "next/image";
import "../app/globals.css";
import useCartStore from "@/cartStore";
export default function Items({ item }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-lg bg-white hover:shadow-neo transition-shadow duration-300 ease-in-out">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
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
        {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">{item.name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">
              ${item.price}
            </span>
            {/* Include this if you have a previous price to show a discount */}
            {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
          </p>
          {/* Removed star rating */}
        </div>
        <button
          onClick={() => addItem(item)}
          className="flex items-center justify-center rounded-md bg-[#ff0000] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#ff7b7b] focus:outline-none focus:ring-4 focus:ring-blue-300"
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
  );
}
