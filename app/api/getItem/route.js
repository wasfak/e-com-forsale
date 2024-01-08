import db from "@/db";
import ItemModel from "@/models/itemSchema";

import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const id = body;

  try {
    await db.connectDb();
    const item = await ItemModel.findOne({ _id: id });
    console.log(item);
    return NextResponse.json({ status: 200, data: item });
  } catch (error) {
    console.log(error);
  }
}
