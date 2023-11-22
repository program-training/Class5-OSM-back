import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
});

export const OrderSchema = new Schema({
  cartItems: [CartItemSchema],
  orderTime: Date,
  status: String,
  price: Number,
  shippingDetails: {
    address: String,
    userId: Number,
    contactNumber: String,
    orderType: String,
  },
});

export const Order = mongoose.model("order", OrderSchema);
