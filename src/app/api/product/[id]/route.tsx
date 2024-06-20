"use server";
import dbConnection from "../../../../../dbsetup/mongodbsetup";
import { NextRequest, NextResponse } from "next/server";
import inventoryModel from "../../../../../MongooseSchema/InventorySchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnection();

  try {
    const { id } = params;
    const findOne = await inventoryModel.findById({ _id: id });
    if (!findOne) {
      return NextResponse.json({ message: "not sucess" }, { status: 401 });
    }

    return NextResponse.json(findOne, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
