import UserInterface from "../interfaces/OrdersInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";

import chalk from "chalk";
import userValidation from "../models/joi/userValidation";
import { ObjectId } from "bson";
import {
  getAllOrdersFromJSON,
  getAllOrdersFromMongoDB,
  getOrderById,
  getOrdersById,
  insertOrderFromAPI,
} from "../../dataAccess/mongoose";
import OrderInterface from "../interfaces/OrdersInterface";
import { Order } from "../models/mongoose/OrderSchema";

type OrderResult = Promise<OrderInterface | null>;

export const getOrders = async () => {
  try {
    const orders = await getAllOrdersFromMongoDB();
    return orders;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
// export const getOrderAPI = async (newOrderData) => {

export const OrderAPI = async (order: OrderInterface): OrderResult => {
  try {
    // const users = await getUsers();

    // const userRegistered = users.find(
    //   (userInDB) => userInDB.email === user.email
    // );
    // if (userRegistered) throw new Error("This user is allready registered!");

    await insertOrderFromAPI(order);
    // users.push({ ...user });

    // await modifyCollection(
    //   "users",
    //   users as unknown as Record<string, unknown>[]
    // );
    return order;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const getOrderFromMDB = await getOrderById(orderId);
    return getOrderFromMDB;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const getOrdersFromMDB = await getOrdersById(userId);
    return getOrdersFromMDB;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editOrder = async (
  orderId: string,
  orderData: Record<string, unknown>
) => {
  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    existingOrder.set(orderData);
    const updatedOrder = await existingOrder.save();

    return updatedOrder;
  } catch (error) {
    return Promise.reject(error);
  }
};
