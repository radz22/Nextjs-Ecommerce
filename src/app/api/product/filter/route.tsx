"use server";

import { NextResponse, NextRequest } from "next/server";
import inventoryModel from "../../../../../MongooseSchema/InventorySchema";
import dbConnection from "../../../../../dbsetup/mongodbsetup";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { category } = await request.json();

    let constFind;
    if (category === null || category === "") {
      constFind = await inventoryModel.find({});
    } else {
      constFind = await inventoryModel.find({ category: category });
    }

    if (!constFind || constFind.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }
    return NextResponse.json(constFind, { status: 200 });
  } catch (error) {
    console.error(error); // Add this line to log the error
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 500 }
    );
  }
}
