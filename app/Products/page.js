import Items from "@/components/Items";
import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";
import mongoose from "mongoose";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const revalidate = 1;
export default async function ProductsPage() {
  const { userId } = auth();

  await db.connectDb();
  const data = await ItemModel.find({ userId }).lean();
  const plainData = data.map((doc) => {
    // Start with an empty object
    const plainObject = {};

    // Iterate over all keys in the document
    Object.keys(doc).forEach((key) => {
      const value = doc[key];

      // Check for ObjectId (common in _id)
      if (key === "_id" || value instanceof mongoose.Types.ObjectId) {
        plainObject[key] = value.toString();
      }
      // Check for Dates and convert them to ISO strings
      else if (value instanceof Date) {
        plainObject[key] = value.toISOString();
      }
      // Add any other special type conversions you might need here

      // If it's none of the above, add it as is
      else {
        plainObject[key] = value;
      }
    });

    return plainObject;
  });
  await db.disconnectDb();
  return (
    <div className="">
      {plainData.length == 0 ? (
        <h1>no items please add items from upload page</h1>
      ) : (
        <div className={`${inter.className} grid grid-cols-3 gap-4 p-4`}>
          {plainData.map((item) => (
            <Items key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
