"use server";
import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../../../../../../dbsetup/mongodbsetup";
import orderModel from "../../../../../../MongooseSchema/OrderSchema";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnection();

  try {
    const { id } = params;
    const { quantity } = await request.json();
    const increment = await orderModel.findByIdAndUpdate(
      { _id: id },
      { $inc: { quantity: -quantity } },
      { new: true }
    );

    if (!increment) {
      return NextResponse.json({ message: "not sucess" }, { status: 401 });
    }
    return NextResponse.json(increment, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 500 }
    );
  }
}
