import chalk from "chalk";

import {
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

export const OrderAPI = async (order: OrderInterface): OrderResult => {
  try {
    await insertOrderFromAPI(order);
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
