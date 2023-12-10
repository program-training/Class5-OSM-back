import { Schema, model } from "mongoose";

const ItemInOrder = new Schema({
  productId: Number,
  name: String,
  description: String,
  price: Number,
  quantity: Number,
});

export const OrderSchema = new Schema({
  cartItems: [ItemInOrder],
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

export const Order = model("order", OrderSchema);
