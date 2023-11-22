import UserInterface from "../interfaces/OrdersInterface";
import {
  // getProducts,
  getProduct,
  getOrders,
} from "../services/ordersApiService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";

export const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    return res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    return res.send(product);
  } catch (error) {
    handleError(res, error);
  }
};
