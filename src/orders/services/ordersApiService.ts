import UserInterface from "../interfaces/OrdersInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";

import chalk from "chalk";
import userValidation from "../models/joi/userValidation";

import {
  getAllOrdersFromJSON,
  getAllOrdersFromMongoDB,
} from "../../dataAccess/mongoose";

type UserResult = Promise<UserInterface | null>;

export const getOrders = async () => {
  try {
    const orders = await getAllOrdersFromMongoDB();
    return orders;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
