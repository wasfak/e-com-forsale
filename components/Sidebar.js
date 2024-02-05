"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  ShoppingCartIcon,
  LayoutDashboard,
  ShoppingBagIcon,
  TagIcon,
} from "lucide-react";
import { RiDashboard3Fill } from "react-icons/ri";
import { Montserrat } from "next/font/google";
import { IoHomeSharp } from "react-icons/io5";
import { MdViewCompactAlt } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";

import Link from "next/link";
import { useEffect, useState } from "react";
import LowItems from "./LowItems";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routesColor = `text-white`;
const routes = [
  {
    label: "Dashboard",
    icon: RiDashboard3Fill,
    href: "/dashboard",
    color: routesColor,
  },
  {
    label: "Orders",
    icon: ShoppingCartIcon,
    href: "/dashboard/orders",
    color: routesColor,
  },
  {
    label: "Products",
    icon: ShoppingBagIcon,
    href: "/dashboard/products",
    color: routesColor,
  },
  {
    label: "Analytics",
    icon: TagIcon,
    href: "/dashboard/plau",
    color: routesColor,
  },
  {
    label: "Categories",
    icon: LayoutDashboard,
    href: "/dashboard/categories",
    color: routesColor,
  },
  {
    label: "Home",
    icon: IoHomeSharp,
    href: "/",
    color: routesColor,
  },
  {
    label: "View Products",
    icon: MdViewCompactAlt,
    href: "/Products",
    color: routesColor,
  },
  {
    label: "Store Management",
    icon: IoStorefrontSharp,
    href: "/dashboard/Store",
    color: routesColor,
  },
];

export default function SideBar() {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const toggleOrders = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };
  const orderSubRoutes = [
    /*    { label: "Processing Orders", href: "/dashboard/orders/processing" },
    { label: "Finished Orders", href: "/dashboard/orders/finished" },
    { label: "Refunded Orders", href: "/dashboard/orders/refund" }, */
  ];
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative space-y-4 py-4 flex flex-col bg-[#ed7966] text-white h-[100vh]">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <div key={route.href} className="relative">
              <Link
                href={route.href}
                className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-white/10 rounded-lg transition "
                onClick={route.label === "Orders" ? toggleOrders : null}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
              {route.label === "Store Management" && (
                <div className="absolute top-0">
                  <LowItems />
                </div>
              )}
              {route.label === "Orders" && isOrdersOpen && (
                <div className="pl-8 space-y-1">
                  {orderSubRoutes.map((subRoute) => (
                    <Link
                      key={subRoute.href}
                      href={subRoute.href}
                      className="text-sm group flex p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/20 rounded-lg transition"
                    >
                      {subRoute.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="absolute bottom-2 left-3">
            {mounted && (
              <UserButton afterSignOutUrl="/" className="bg-[#ed7966]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
