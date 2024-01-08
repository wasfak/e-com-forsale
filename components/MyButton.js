"use client";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function MyButton({ children, orderId }) {
  const router = useRouter();
  const handelClick = async () => {
    const response = await fetch("/api/modifyOrder", {
      method: "POST",
      body: JSON.stringify(orderId),
    });
    const data = await response.json();
    if (data.status === 200) {
      toast.success(data.message);
      router.push("/dashboard/orders/processing");
    }
  };
  return (
    <div>
      <Button onClick={handelClick}>{children}</Button>
    </div>
  );
}
