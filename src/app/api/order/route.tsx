"use server";
import orderModel from "../../../../MongooseSchema/OrderSchema";
import dbConnection from "../../../../dbsetup/mongodbsetup";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { item, user, image, price, quantity } = await request.json();

    const data = {
      item,
      user,
      image,
      price,
      quantity,
    };
    const createOrder = await orderModel.create(data);

    if (!createOrder) {
      return NextResponse.json(
        { message: "Product not Created" },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "Product  Created" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
