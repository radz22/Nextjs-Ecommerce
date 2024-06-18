"use server";
import ProductModel from "../../../../MongooseSchema/ProductSchema";
import dbConnection from "../../../../dbsetup/mongodbsetup";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { category, image, name, price } = await request.json();

    const data = {
      category,
      image,
      name,
      price,
    };
    const createProduct = await ProductModel.create(data);

    if (!createProduct) {
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

export async function GET() {
  await dbConnection();
  try {
    const findAllProudct = await ProductModel.find({});

    if (!findAllProudct) {
      return NextResponse.json({ message: "not get" }, { status: 401 });
    }

    return NextResponse.json(findAllProudct, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
