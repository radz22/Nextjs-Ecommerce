"use server";
import orderModel from "../../../../../MongooseSchema/OrderSchema";
import dbConnection from "../../../../../dbsetup/mongodbsetup";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { user } = await request.json();

    const findOrderUser = await orderModel.find({ user: user });
    if (!findOrderUser) {
      return NextResponse.json({ message: "order not found" }, { status: 401 });
    }
    return NextResponse.json(findOrderUser, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 501 }
    );
  }
}
