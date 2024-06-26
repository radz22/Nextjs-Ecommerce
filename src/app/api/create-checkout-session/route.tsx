"use server";
import inventoryModel from "../../../../MongooseSchema/InventorySchema";
import dbConnection from "../../../../dbsetup/mongodbsetup";
import { NextResponse, NextRequest } from "next/server";
import stripe from "stripe";
const stripeInstance = new stripe(
  "sk_test_51PVrHLEpyR2QvynpzxBSbh9HZasWyccs6unQkmtVZ2fiBXvpCTo12i0a2o1iGDBBXteXzq7ii5l3QKenFIkewpz000icrBx4JW"
);
export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { product } = await request.json();
    console.log(product);
    const session = await stripeInstance.checkout.sessions.create({
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
      success_url: "http://localhost:3000/pages/sucess",
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
