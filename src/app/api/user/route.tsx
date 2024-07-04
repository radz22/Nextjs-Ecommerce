"use server";

import UserModel from "../../../../MongooseSchema/AuthenticationSchema";
import { NextResponse, NextRequest } from "next/server";
import dbConnection from "../../../../dbsetup/mongodbsetup";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { name, image, provider } = await request.json();

    const findUser = await UserModel.findOne({
      name: name,
      provider: provider,
    });

    if (!findUser) {
      const create = await UserModel.create({ name, image, provider });

      return NextResponse.json(create, { status: 200 });
    }
    if (findUser) {
      return NextResponse.json(findUser, { status: 200 });
    }
  } catch {
    return NextResponse.json(
      { message: "Error creating User" },
      { status: 400 }
    );
  }
}
