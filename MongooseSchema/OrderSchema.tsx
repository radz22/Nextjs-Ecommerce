import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";
interface order extends Document {
  productid: string;
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
}

const orderSchema = new Schema<order>(
  {
    productid: { type: String, required: true },
    item: { type: String, required: true },
    user: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
