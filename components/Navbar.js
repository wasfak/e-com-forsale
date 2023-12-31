"use client";
import Link from "next/link";
import logo from "../app/assets/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { UserButton } from "@clerk/nextjs";
import useCartStore from "@/cartStore";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const totalCart = useCartStore((state) => state.items);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return (
    <header
      className={`w-full flex items-center p-2 justify-between bg-[#6495ED] font-bold text-slate-900 font-sriracha`}
    >
      <Link href="/" as={"image"}>
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex items-center justify-between gap-x-6">
        <Link href="/">Home</Link>
        <Link href="/Products">Products</Link>
        <Link href="/UploadPage">Upload product</Link>
      </div>
      <div className="flex items-center justify-between gap-x-4">
        <Link href="/cart">
          {" "}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {totalCart.length}
            </span>
          </div>
        </Link>

        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
