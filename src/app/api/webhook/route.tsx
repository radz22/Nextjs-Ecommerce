import Stripe from "stripe";
import { newStripes } from "@/app/components/stripe";
import { headers } from "next/headers";
import dbConnection from "../../../../dbsetup/mongodbsetup";
import receiveModel from "../../../../MongooseSchema/ReceiveCashOnDeliverySchema";
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!; // Obtained from Stripe dashboard

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;
  try {
    event = newStripes.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    console.log(error);
  }

  if (event?.type == "checkout.session.completed") {
    await dbConnection();
    const session = event.data.object;
    const items = JSON.parse(session.metadata.items);

    for (const item of items) {
      const newReceive = new receiveModel({
        item: item.item,
        user: item.user,
        image: item.image,
        price: item.price * item.quantity,
        quantity: item.quantity,
        productid: item.productid,
        status: "to pay",
        payment: "Credit/Debit Card",
      });
      await newReceive.save();
    }
  }
}
