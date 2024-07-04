"use server";
import { NextResponse, NextRequest } from "next/server";
import dbConnection from "../../../../../dbsetup/mongodbsetup";
import receiveModel from "../../../../../MongooseSchema/ReceiveCashOnDeliverySchema";
export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { user } = await request.json();

    const findUser = await receiveModel.find({ user: user });
    if (!findUser) {
      return NextResponse.json({ message: "Error creating " }, { status: 400 });
    }

    return NextResponse.json(findUser, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error server " }, { status: 500 });
  }
}
