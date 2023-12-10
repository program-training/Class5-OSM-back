import { Order } from "../models/Orders";
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
    const orders = await Order.find({});
    return orders;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrderById = async (_: any, { id }: GetOrderByIdInterface) => {
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
export const getOrdersByClientId = async (
  _: any,
  { userId }: GetOrderByIdInterface
) => {
  try {
    const orders = await Order.find({ "shippingDetails.userId": userId });
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
    console.log(order);

    const existingOrder = await Order.findById(order.orderId);
    console.log(existingOrder);

    if (!existingOrder) {
      throw new Error("Order not found");
    }
    existingOrder.set("status", order.status);
    await existingOrder.save();
    return existingOrder;
  } catch (error) {
    return Promise.reject(error);
  }
};
