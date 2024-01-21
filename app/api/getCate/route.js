import db from "@/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import CategoryModel from "@/models/Category";
export const revalidate = 0;
export const GET = async (req) => {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ status: 400, message: "NO USER" });
  }

  try {
    await db.connectDb();

    const data = await CategoryModel.find({ userId });

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    db.disconnectDb();
  }
};
