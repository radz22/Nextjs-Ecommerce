"use server";

import { NextResponse, NextRequest } from "next/server";
import inventoryModel from "../../../../../MongooseSchema/InventorySchema";
import dbConnection from "../../../../../dbsetup/mongodbsetup";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const findAll = await inventoryModel.find({});
    const countAll = findAll.length;
    const { limit, offset } = await request.json();
    const data = await inventoryModel
      .find()
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    return NextResponse.json(
      { data: data, countall: countAll },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
