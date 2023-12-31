import Items from "@/components/Items";
import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";
import mongoose from "mongoose";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function ProductsPage() {
  let plainData = [];
  let error = null;

  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    await db.connectDb();
    const data = await ItemModel.find({ userId }).lean();

    plainData = data.map((doc) => {
      const plainObject = {};

      Object.keys(doc).forEach((key) => {
        const value = doc[key];

        if (key === "_id" || value instanceof mongoose.Types.ObjectId) {
          plainObject[key] = value.toString();
        } else if (value instanceof Date) {
          plainObject[key] = value.toISOString();
        } else {
          plainObject[key] = value;
        }
      });

      return plainObject;
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    error = err.message || "Failed to load products.";
  } finally {
    await db.disconnectDb();
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  if (plainData.length === 0) {
    return (
      <div className="text-center py-10">
        No items. Please add items from the upload page.
      </div>
    );
  }

  return (
    <div className={`container mx-auto py-8 ${inter.className}`}>
      <h1 className="text-2xl font-bold mb-2 text-center">Products</h1>
      <div className="grid grid-cols-3 gap-4 p-4 bg-[##fbf7f5]">
        {plainData.map((item, index) => (
          <Items key={item._id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
