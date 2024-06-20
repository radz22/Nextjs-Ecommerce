"use server";
import { NextResponse, NextRequest } from "next/server";
import CommentModel from "../../../../../MongooseSchema/CommentSchema";
import dbConnection from "../../../../../dbsetup/mongodbsetup";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnection();

  try {
    const { id } = params;
    const findandDelete = await CommentModel.findByIdAndDelete({ _id: id });
    if (!findandDelete) {
      return NextResponse.json({ message: "not deleted" }, { status: 401 });
    }

    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Error / Backend Error" },
      { status: 400 }
    );
  }
}
