import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";

interface products extends Document {
  category: string;
  image: string;
  name: string;
  price: number;
}

const productSchema = new Schema<products>(
  {
    category: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default ProductModel;
