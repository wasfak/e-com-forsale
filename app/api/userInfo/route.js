import db from "@/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import UserModel from "@/models/userSchema";
import { currentUser } from "@clerk/nextjs";
export const revalidate = 0;
export const GET = async (req) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ status: 200, data: "no" });
  }
  try {
    await db.connectDb();

    const userInfo = await UserModel.find({
      email: user.emailAddresses[0].emailAddress,
    });
    if (userInfo.length === 0) {
      return NextResponse.json({ status: 200, data: "no" });
    }

    return NextResponse.json({ status: 200, userInfo });
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
