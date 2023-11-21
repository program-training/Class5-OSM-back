import UserInterface from "../interfaces/ProductsInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import {
  getCollectionFromJsonFile,
  modifyCollection,
} from "../../dataAccess/jsonfileDAL";
import chalk from "chalk";
import userValidation from "../models/joi/userValidation";
import { getDataFromDummy } from "../../dataAccess/dummyjson";
import { addDataToJsonPlaceHolder } from "../../dataAccess/jsonPlaceHolder";
import {
  getAllProductsFromMongoDB,
  getProductById,
} from "../../dataAccess/mongoose";

type UserResult = Promise<UserInterface | null>;

export const getProducts = async () => {
  try {
    const products = await getAllProductsFromMongoDB();
    return products;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const getProduct = async (productId: string) => {
  try {
    const getProductFromMDB = await getProductById(productId);
    console.log(getProductFromMDB);
    return getProductFromMDB;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
