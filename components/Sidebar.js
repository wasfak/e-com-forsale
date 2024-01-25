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

import Link from "next/link";
import { useEffect, useState } from "react";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: RiDashboard3Fill,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Orders",
    icon: ShoppingCartIcon,
    href: "/dashboard/orders",
    color: "text-sky-500",
  },
  {
    label: "Products",
    icon: ShoppingBagIcon,
    href: "/dashboard/products",
    color: "text-sky-500",
  },
  {
    label: "Analytics",
    icon: TagIcon,
    href: "/dashboard/analytics",
    color: "text-sky-500",
  },
  {
    label: "Categories",
    icon: LayoutDashboard,
    href: "/dashboard/categories",
    color: "text-sky-500",
  },
  {
    label: "Home",
    icon: IoHomeSharp,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "View Products",
    icon: MdViewCompactAlt,
    href: "/Products",
    color: "text-sky-500",
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
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#518e9b] text-white ">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <div key={route.href}>
              <Link
                href={route.href}
                className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition "
                onClick={route.label === "Orders" ? toggleOrders : null}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
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
          <div>{mounted && <UserButton afterSignOutUrl="/" />}</div>
        </div>
      </div>
    </div>
  );
}
