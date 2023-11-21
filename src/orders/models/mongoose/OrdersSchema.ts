import mongoose, { Schema, InferSchemaType, Model } from "mongoose";
export const OrdersSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
});
export const Product = mongoose.model("order", OrdersSchema);
