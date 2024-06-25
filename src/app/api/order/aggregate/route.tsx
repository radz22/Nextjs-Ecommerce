"use server";
import { NextResponse, NextRequest } from "next/server";
import orderModel from "../../../../../MongooseSchema/OrderSchema";
import dbConnection from "../../../../../dbsetup/mongodbsetup";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { user } = await request.json();

    const aggregate = await orderModel.aggregate([
      { $match: { user: user } },
      {
        $lookup: {
          from: "inventory",
          localField: "item",
          foreignField: "name",
          as: "inventory_docs",
        },
      },
      {
        $project: {
          item: 1,
          total_price: {
            $multiply: ["$price", "$quantity"],
          },
        },
      },
      {
        $group: {
          _id: null,
          items_total_prices: {
            $push: "$$ROOT",
          },

          total_all_prices: {
            $sum: "$total_price",
          },
        },
      },
    ]);

    if (!aggregate) {
      return NextResponse.json({ message: "not sucess" }, { status: 401 });
    }
    return NextResponse.json(aggregate, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 500 }
    );
  }
}
