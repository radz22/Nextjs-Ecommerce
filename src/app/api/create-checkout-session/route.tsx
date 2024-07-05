"use server";
import dbConnection from "../../../../dbsetup/mongodbsetup";
import { NextResponse, NextRequest } from "next/server";
import { newStripes } from "@/app/components/stripe";
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
    const { product } = await request.json();

    const session = await newStripes.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: product.map((item: any) => ({
        price_data: {
          currency: "php",
          product_data: {
            name: item.item,
            images: [item.image], // Include image URL
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      metadata: {
        items: JSON.stringify(
          product.map((item: any) => ({
            item: item.item,
            productid: item.productid,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            user: item.user,
          }))
        ),
      },
      success_url: "http://localhost:3000/pages/receive",
      cancel_url: "http://localhost:3000/pages/cart",
    });

    return NextResponse.json(session.id, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
