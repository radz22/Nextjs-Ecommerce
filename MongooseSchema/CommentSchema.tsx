import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";

interface comment extends Document {
  commentid: string;
  comment: string;
  image: string;
  name: string;
  star: number;
}

const commentSchema = new Schema<comment>(
  {
    commentid: { type: String, required: true },
    comment: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    star: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CommentModel =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default CommentModel;
