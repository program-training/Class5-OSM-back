import mongoose, { ObjectId } from "mongoose";
import { User } from "../users/models/mongoose/UserSchema";
import UserInterface from "../users/interfaces/UserInterface";
import { readJsonFileOrders } from "../initialData/initialDataService";
import OrderInterface from "../orders/interfaces/OrdersInterface";
import { Order } from "../orders/models/mongoose/OrderSchema";
var ObjectId1 = require("mongoose").Types.ObjectId;
import "dotenv/config";
export const connectToMongoose = async () => {
  try {
    if (process.env.MONGODB_URI)
      await mongoose.connect(process.env.MONGODB_URI);

    return "Connected to MongoDB";
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllOrdersFromJSON = async () => {
  try {
    const orders = await readJsonFileOrders();
    return orders;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const insertOrdersIntoMongoose = async () => {
  try {
    const orders = await getAllOrdersFromJSON();
    const existingOrdersCount = await Order.countDocuments();

    if (existingOrdersCount === 0) {
      await Order.insertMany(orders);
      console.log("Orders inserted successfully!");
    } else {
      console.log("Mongoose database already contains orders.");
    }
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const getAllOrdersFromMongoDB = async () => {
  try {
    const orders = await Order.find();
    console.log(orders);

    return orders;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return; 
    }
    return user;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const insertOrderFromAPI = async (order: OrderInterface) => {
  try {
    const newOrder = new Order(order);
    const orderFromDB = await newOrder.save();
    return orderFromDB;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const getOrderById = async (id: string) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Can't find your order.");
    }
    return order;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};
export const getOrdersById = async (id: string) => {
  try {
    const orders = await Order.find({ "shippingDetails.userId": id });

    if (!orders) {
      throw new Error("Can't find your orders.");
    }
    return orders;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};
