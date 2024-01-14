// ModifyItemPage.js
"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function UploadPic({ onImageUpload }) {
  const [url, setUrl] = useState("");

  const handleImageUpload = (result) => {
    if (result.event === "success" && result.info.secure_url) {
      setUrl(result.info.secure_url);
      onImageUpload(result.info.secure_url);
    }
  };

  return (
    <>
      <div className="">
        {url && (
          <Image
            className="object-cover"
            alt="Uploaded image"
            src={url}
            width={200}
            height={200}
          />
        )}
      </div>
      <CldUploadWidget uploadPreset="avhlxw7g" onUpload={handleImageUpload}>
        {({ open }) => (
          <button
            onClick={() => open()}
            type="button"
            className="flex items-center justify-center bg-black text-white p-3 rounded-2xl"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
    </>
  );
}

export default function ModifyItemPage() {
  const [mounted, setMounted] = useState(false);
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
    const response = await fetch("/api/getItem", {
      method: "POST",
      body: JSON.stringify(id),
    });

    const res = await response.json();
    if (res.status === 200) {
      setItem(res.data);
    }
  };

  const handleImageUpload = (url) => {
    setItem((prevData) => ({
      ...prevData,
      imageUrl: url,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  if (!mounted) {
    return "";
  }
  return (
    <div className="p-2 m-2 ">
      <h1 className="text-3xl font-semibold mb-6">Modify Product</h1>
      <form className="space-y-4">
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Details:
          </label>
          <textarea
            name="details"
            value={item.details}
            onChange={handleChange}
            placeholder="Product Details"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={item.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="isOnSale"
            checked={item.isOnSale}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-600">On Sale:</label>
        </div>
        {item.isOnSale && (
          <div className="mb-4 ml-6">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="discountType"
                value="percentage"
                checked={item.discountType === "percentage"}
                onChange={handleChange}
                className="mr-1"
              />
              <label className="text-sm font-medium text-gray-600 mr-2">
                Percentage:
              </label>
              <input
                type="text"
                name="discountPercentage"
                value={item.discountPercentage || ""}
                onChange={handleChange}
                placeholder="15"
                className="p-2 border rounded"
              />
              %
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="discountType"
                value="fixed"
                checked={item.discountType === "fixed"}
                onChange={handleChange}
                className="mr-1"
              />
              <label className="text-sm font-medium text-gray-600 mr-2">
                Fixed Amount:
              </label>
              <input
                type="text"
                name="discountAmount"
                value={item.discountAmount || ""}
                onChange={handleChange}
                placeholder="3"
                className="p-2 border rounded"
              />
              $
            </div>
          </div>
        )}
        <Image
          className="object-cover"
          alt="Uploaded image"
          src={item.imageUrl}
          width={200}
          height={200}
        />
        <UploadPic onImageUpload={handleImageUpload} />
        <div>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => console.log("Update functionality here")}
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
