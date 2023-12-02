import {
  OrderAPI,
  editOrder,
  getOrder,
  getOrders,
  getOrdersByUserId,
} from "../services/ordersApiService";
import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";
import OrderInterface from "../interfaces/OrdersInterface";

export const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();

    return res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleOrderFromAPI = async (req: Request, res: Response) => {
  try {
    const order: OrderInterface = req.body;

    const orderFromDB = await OrderAPI(order);
    return res.status(201).send(orderFromDB);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleGetOrder = async (req: Request, res: Response) => {
  try {
    const { id: orderId } = req.params;
    const order = await getOrder(orderId);
    return res.send(order);
  } catch (error) {
    handleError(res, error);
  }
};
export const handleGetOrderByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUserId(userId);
    return res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleEditOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await editOrder(id, req.body);
    res.send("Updated!");
  } catch (error) {
    handleError(res, error);
  }
};
