import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";

interface receive extends Document {
  productid: string;
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  payment: string;
  // number: string;
  // provice: string;
  // city: string;
  // brgy: string;
  // street: string;
  // landmark: string;
}

const receiveSchema = new Schema<receive>(
  {
    productid: { type: String, required: true },
    item: { type: String, required: true },
    user: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    payment: { type: String, required: true },

    // number: { type: String },
    // provice: { type: String },
    // city: { type: String },
    // brgy: { type: String },
    // street: { type: String },
    // landmark: { type: String },
  },
  {
    timestamps: true,
  }
);

const receiveModel =
  mongoose.models.receive || mongoose.model("receive", receiveSchema);
export default receiveModel;
