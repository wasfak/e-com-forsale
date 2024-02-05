"use client";
import Link from "next/link";
import logo from "../app/assets/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header
      className={`w-full flex items-center p-2 justify-between bg-[#0e3746] font-bold text-slate-900`}
    >
      <Image src={logo} alt="logo" width={65} height={65} priority />

      <nav className="flex items-center justify-between gap-x-6">
        <Link href="/" className="text-white">
          Home
        </Link>

        <>
          <Link href="/dashboard" className="text-white">
            Dashboard
          </Link>
        </>
      </nav>

      <div className="flex items-center justify-between gap-x-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
