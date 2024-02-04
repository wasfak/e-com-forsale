"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

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

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: "",
    details: "",
    price: "",
    isOnSale: false,
    imageUrl: "",
    discountType: "",
    discountPercentage: "",
    discountAmount: "",
  });

  const productSchema = z
    .object({
      name: z
        .string()
        .min(1, "Please enter a product name.")
        .max(200, "Product name is too long. Maximum 200 characters."),
      details: z
        .string()
        .min(1, "Please provide some details about the product.")
        .max(500, "Details are too long. Maximum 500 characters."),
      price: z.string().min(0, "Price must be a positive number."),
      isOnSale: z.boolean(),
      imageUrl: z
        .string()
        .url("Please provide a valid image URL.")
        .nonempty("Please upload an image for the product."),
      discountType: z.string().nullable(),
      discountPercentage: z.string().optional().nullable(),
      discountAmount: z.string().optional().nullable(),
    })
    .refine(
      (data) => {
        if (data.isOnSale) {
          return (
            data.discountType &&
            (data.discountPercentage || data.discountAmount)
          );
        }
        return true;
      },
      {
        message: "Please provide discount details for sale items.",
        path: ["discountType", "discountPercentage", "discountAmount"],
      }
    );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (url) => {
    setProductData((prevData) => ({
      ...prevData,
      imageUrl: url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let preparedData = {
      ...productData,
    };

    // If not on sale, ignore discount fields
    if (!productData.isOnSale) {
      preparedData = {
        ...preparedData,
        discountType: null,
        discountPercentage: null,
        discountAmount: null,
      };
    }

    // Validate the prepared data
    const validation = productSchema.safeParse(preparedData);

    if (!validation.success) {
      // Handle specific validation error for 'discountType'
      const discountTypeError = validation.error.errors.find(
        (err) =>
          err.path[0] === "discountType" &&
          err.message === "Expected 'percentage' | 'fixed', received null"
      );

      if (discountTypeError) {
        validation.data = {
          ...validation.data,
          discountType: null,
        };
      } else {
        // If validation fails for other reasons, show the first error and prevent submission
        const firstError = validation.error.issues[0];
        toast.error(firstError.message);
        setLoading(false);
        return;
      }
    }

    try {
      // Construct the request body using the validated and prepared data
      const requestBody = {
        ...validation.data,
      };

      // Make the fetch request
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();

      if (data.status === 200) {
        toast.success("Product added successfully");
        router.push("/dashboard/products");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product");
    } finally {
      setProductData({
        name: "",
        details: "",
        price: "",
        isOnSale: false,
        imageUrl: "",
        discountType: "",
        discountPercentage: null,
        discountAmount: null,
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow-2xl">
      <h1 className="text-3xl font-semibold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
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
            value={productData.details}
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
            value={productData.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="isOnSale"
            checked={productData.isOnSale}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-600">On Sale:</label>
        </div>
        {productData.isOnSale && (
          <div className="mb-4 ml-6">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="discountType"
                value="percentage"
                checked={productData.discountType === "percentage"}
                onChange={handleChange}
                className="mr-1"
              />
              <label className="text-sm font-medium text-gray-600 mr-2">
                Percentage:
              </label>
              <input
                type="text"
                name="discountPercentage"
                value={productData.discountPercentage || ""}
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
                checked={productData.discountType === "fixed"}
                onChange={handleChange}
                className="mr-1"
              />
              <label className="text-sm font-medium text-gray-600 mr-2">
                Fixed Amount:
              </label>
              <input
                type="text"
                name="discountAmount"
                value={productData.discountAmount || ""}
                onChange={handleChange}
                placeholder="3"
                className="p-2 border rounded"
              />
              $
            </div>
          </div>
        )}
        <UploadPic onImageUpload={handleImageUpload} />
        <div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {loading ? "Adding Product.." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
