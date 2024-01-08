"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AdminItems({ item }) {
  const router = useRouter();
  return (
    <div className="flex items-center w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="w-16 h-16 relative">
        <Image
          alt={item.name}
          src={item.imageUrl}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600">{`$${item.priceAfterSale}`}</p>
        <p className="text-sm text-gray-500 overflow-ellipsis overflow-hidden">
          {item.details}
        </p>
      </div>
      <div className="flex flex-col space-y-2 mr-4">
        <Button onClick={() => router.push(`/dashboard/products/${item._id}`)}>
          Edit
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
}
