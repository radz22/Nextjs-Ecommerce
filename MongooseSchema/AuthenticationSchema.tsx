import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  image: string;
  provider: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    provider: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
