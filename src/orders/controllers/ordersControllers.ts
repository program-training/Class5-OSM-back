import UserInterface from "../interfaces/OrdersInterface";
import { getOrders } from "../services/ordersApiService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";

export const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    console.log(process.env.MONGODB_URI);

    return res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
};
