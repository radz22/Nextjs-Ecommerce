"use server";
import dbConnection from "../../../../dbsetup/mongodbsetup";
import CommentModel from "../../../../MongooseSchema/CommentSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { comment, image, name, star } = await request.json();

    const data = {
      comment,
      image,
      name,
      star,
    };
    const createProduct = await CommentModel.create(data);

    if (!createProduct) {
      return NextResponse.json(
        { message: "Comment not Created" },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "Comment  Created" }, { status: 200 });
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
    const findAllComment = await CommentModel.find({});

    if (!findAllComment) {
      return NextResponse.json({ message: "not get" }, { status: 401 });
    }

    return NextResponse.json(findAllComment, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
