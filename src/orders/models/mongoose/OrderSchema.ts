import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema({
  productId: Number,
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
    userId: String,
    contactNumber: String,
    orderType: String,
  },
});

export const Order = mongoose.model("order", OrderSchema);
