import db from "@/db";
import ItemModel from "@/models/itemSchema";
import mongoose from "mongoose";

export const getData = async () => {
  let plainData = [];

  await db.connectDb();
  const data = await ItemModel.find().lean();

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

  return plainData;
};
