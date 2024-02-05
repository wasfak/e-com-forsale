import db from "@/db";
import ItemModel from "@/models/itemSchema";
import { auth } from "@clerk/nextjs";

import AdminItems from "@/components/AdminItems";

export default async function StorePage() {
  const { userId } = await auth();
  await db.connectDb();

  try {
    // Find items with stock less than 10 for the specific user
    const items = await ItemModel.find({ userId, stock: { $lt: 5 } });
    if (items.length === 0) {
      return (
        <div className="flex items-center justify-center text-bold text-4xl">
          No Items..
        </div>
      );
    }
    const sanitizedData = items.map((doc) => {
      if (doc instanceof ItemModel) {
        const { _id, createdAt, updatedAt, ...rest } = doc.toObject();
        return {
          _id: _id.toString(),
          createdAt: new Date(createdAt).toLocaleDateString(), // Convert to string or format as needed
          updatedAt: new Date(updatedAt).toLocaleDateString(), // Convert to string or format as needed
          ...rest,
        };
      } else {
        // If it's already a plain JavaScript object, no need to convert
        return doc;
      }
    });

    return (
      <div className="flex items-center justify-between flex-wrap p-4">
        {sanitizedData.map((item) => (
          <AdminItems item={item} key={item._id} />
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    // Handle errors as needed
    return <div>Something went wrong</div>;
  } finally {
    db.disconnectDb();
  }
}
