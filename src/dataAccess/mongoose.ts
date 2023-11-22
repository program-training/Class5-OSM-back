import mongoose, { ObjectId } from "mongoose";
import { User } from "../users/models/mongoose/UserSchema";
import UserInterface from "../users/interfaces/UserInterface";
import { readJsonFileOrders } from "../initialData/initialDataService";
import OrderInterface from "../orders/interfaces/OrdersInterface";
import { Order } from "../orders/models/mongoose/OrderSchema";
var ObjectId1 = require("mongoose").Types.ObjectId;

export const connectToMongoose = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://8a:123456789Aa@cluster0.pugoiz1.mongodb.net/project-team1"
    );
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

export const insertOrdersIntoMongoose = async (orders: OrderInterface) => {
  try {
    const newOrder = new Order(orders);
    const ordersFromDB = await newOrder.save();
    return ordersFromDB;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const getAllOrdersFromMongoDB = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("Product not found");
      return; // or throw an error or return an appropriate response
    }
    console.log(4);
    console.log(user, "65546845647854");
    return user;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
