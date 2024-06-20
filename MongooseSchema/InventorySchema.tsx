import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";

interface inventory extends Document {
  category: string;
  image: string;
  name: string;
  price: number;
}

const inventorySchema = new Schema<inventory>(
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

const inventoryModel =
  mongoose.models.inventory || mongoose.model("inventory", inventorySchema);
export default inventoryModel;
