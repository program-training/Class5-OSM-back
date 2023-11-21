import UserInterface from "../interfaces/CategoryInterface";
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
  getAllCategoriesFromMongoDB,
  getAllProductsFromMongoDB,
  getCategoryById,
  getProductById,
} from "../../dataAccess/mongoose";
import CategoryInterface from "../interfaces/CategoryInterface";

type UserResult = Promise<UserInterface | null>;

export const getCategories = async () => {
  try {
    const categories = await getAllCategoriesFromMongoDB();
    return categories;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const getCategory = async (productId: string) => {
  try {
    const getCategoryFromMDB = await getCategoryById(productId);
    console.log(getCategoryFromMDB);
    return getCategoryFromMDB;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const editCategory = async (
  categoryName: string,
  categoryToUpdate: CategoryInterface
) => {
  try {
    const categories = await getAllCategoriesFromMongoDB();
    if (categories instanceof Error) {
      throw new Error("Oops... Could not get the categories from the Database");
    }
    const index = categories.findIndex(
      (category) => (category.category_name = categoryName)
    );
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
