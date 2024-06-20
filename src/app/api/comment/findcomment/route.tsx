"use server";
import { NextResponse, NextRequest } from "next/server";
import CommentModel from "../../../../../MongooseSchema/CommentSchema";
import dbConnection from "../../../../../dbsetup/mongodbsetup";

export async function POST(request: NextRequest) {
  await dbConnection();
  try {
    const { commentid } = await request.json();

    const findCommentId = await CommentModel.find({ commentid: commentid });
    if (!findCommentId) {
      return NextResponse.json({ message: "not find" }, { status: 401 });
    }
    return NextResponse.json(findCommentId, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
