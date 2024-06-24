"use server";
import orderModel from "../../../../MongooseSchema/OrderSchema";
import dbConnection from "../../../../dbsetup/mongodbsetup";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { item, user, image, price, quantity, productid } =
      await request.json();

    const data = {
      productid,
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

export async function DELETE(request: NextRequest) {
  await dbConnection();
  try {
    const { id } = await request.json();

    const findAndDelete = await orderModel.findByIdAndDelete({ _id: id });
    if (!findAndDelete) {
      return NextResponse.json(
        { message: "Product not delete" },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "Product  delete" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 500 }
    );
  }
}
