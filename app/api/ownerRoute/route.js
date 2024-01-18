import db from "@/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import UserModel from "@/models/userSchema";
export const revalidate = 0;
export const GET = async (req) => {
  const { userId } = auth();

  if (!userId === "user_2a59AvSfOfCZq3D5AVL3ZO0xlfd") {
    return NextResponse.json({ status: 200, data: "You Are Not Allowed" });
  }
  try {
    await db.connectDb();

    const data = await UserModel.find();

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

export const POST = async (req) => {
  const { userId } = auth();
  const body = await req.json();
  const { _id, userStatus } = body;

  if (!userId === "user_2a59AvSfOfCZq3D5AVL3ZO0xlfd") {
    return NextResponse.json({ status: 200, data: "You Are Not Allowed" });
  }
  try {
    await db.connectDb();

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      { $set: { userStatus } },
      { new: true } // Return the modified document rather than the original
    );

    return NextResponse.json({ status: 200, updatedUser });
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
