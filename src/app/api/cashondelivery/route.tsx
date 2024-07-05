"use server";
import receiveModel from "../../../../MongooseSchema/ReceiveCashOnDeliverySchema";
import { NextResponse, NextRequest } from "next/server";
import dbConnection from "../../../../dbsetup/mongodbsetup";

interface receive {
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
  productid: string;
}

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { product, status } = await request.json();

    const items = product.map((item: receive) => ({
      item: item.item,
      user: item.user,
      image: item.image,
      price: item.price * item.quantity,
      quantity: item.quantity,
      productid: item.productid,
    }));

    const data = items.map((item: any) => ({
      ...item,
      status: status,
      payment: "cashondelivery",
    }));
    const create = await receiveModel.create(data);
    if (!create) {
      return NextResponse.json({ message: "Error creating " }, { status: 400 });
    }

    return NextResponse.json(items, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error server " }, { status: 500 });
  }
}
