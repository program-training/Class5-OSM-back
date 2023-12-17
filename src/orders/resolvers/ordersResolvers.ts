import { RedisJSON } from "@redis/json/dist/commands";
import { client } from "../../cache/redisConnect";
import OrderInterface from "../interfaces/OrdersInterface";
import { Order } from "../models/Orders";
import { checkExistKey, setWithJsonKey } from "../ordersCache/redisHelpers";

interface GetOrderByIdInterface {
  id: string;
  userId?: string;
}

interface SetStatusInterface {
  orderId: string;
  status: string;
}

interface SetOrderData {
  orderId: string;
  address: string;
  contactNumber: string;
  orderType: string;
}
export const getAllOrdersFromMongoDB = async () => {
  try {
    const exist = await checkExistKey("orders");
    if (!exist) {
      const orders = await Order.find({});
      await setWithJsonKey("orders", ".", orders as unknown as RedisJSON);
      return await client.json.get("orders", { path: "." });
    }
    return await client.json.get("orders", { path: "." });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrderById = async (_: any, { id }: GetOrderByIdInterface) => {
  try {
    const exist = await checkExistKey("orders");
    if (!exist) {
      const orders = await Order.find({});
      await setWithJsonKey("orders", ".", orders as unknown as RedisJSON);
    }
    const jsonResult = await client.json.get("orders", {
      path: `$..[?(@._id=="${id}")]`,
    });
    if (!jsonResult) {
      throw new Error("Can't find your order.");
    }
    const order = jsonResult as unknown as OrderInterface[];
    return order[0];
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const getOrdersByClientId = async (
  _: any,
  { userId }: GetOrderByIdInterface
) => {
  try {
    const exist = await checkExistKey("orders");
    if (!exist) {
      const orders = await Order.find({});
      await setWithJsonKey("orders", ".", orders as unknown as RedisJSON);
    }
    const orders = await client.json.get("orders", {
      path: `$..[?(@.shippingDetails.userId=="${userId}")]`,
    });
    if (!orders) {
      throw new Error("Can't find your orders.");
    }
    return orders;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const updateOrderDetails = async (
  _: any,
  { order }: { order: SetOrderData }
) => {
  try {
    const existingOrder = await Order.findById(order.orderId);
    if (!existingOrder) {
      throw new Error("Order not found");
    }
    existingOrder.set({
      "shippingDetails.address": order.address,
      "shippingDetails.contactNumber": order.contactNumber,
      "shippingDetails.orderType": order.orderType,
    });
    await existingOrder.save();
    await client.json.del("orders");
    return existingOrder;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOrderStatus = async (
  _: any,
  { order }: { order: SetStatusInterface }
) => {
  try {
    const existingOrder = await Order.findById(order.orderId);
    if (!existingOrder) {
      throw new Error("Order not found");
    }
    existingOrder.set("status", order.status);
    await existingOrder.save();
    await client.json.del("orders");
    return existingOrder;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createNewOrder = async (
  _: any,
  { newOrder }: { newOrder: OrderInterface }
) => {
  try {
    const newOrderRes = new Order(newOrder);
    await newOrderRes.save();
    await client.json.del("orders");
    return newOrderRes;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};
