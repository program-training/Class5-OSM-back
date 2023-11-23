import UserInterface from "../interfaces/OrdersInterface";
import { OrderAPI, getOrders } from "../services/ordersApiService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";
import OrderInterface from "../interfaces/OrdersInterface";

export const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    console.log(process.env.MONGODB_URI);

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
