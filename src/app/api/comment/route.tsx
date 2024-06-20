"use server";
import dbConnection from "../../../../dbsetup/mongodbsetup";
import CommentModel from "../../../../MongooseSchema/CommentSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { comment, image, name, star, commentid } = await request.json();

    const data = {
      commentid,
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
