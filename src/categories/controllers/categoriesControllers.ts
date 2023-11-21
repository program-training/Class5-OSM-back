import UserInterface from "../interfaces/CategoryInterface";
import { getCategories, getCategory } from "../services/categoriesApiService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";
import CategoryInterface from "../interfaces/CategoryInterface";
import { Category } from "../models/mongoose/CategorySchema";
import { getAllCategoriesFromMongoDB } from "../../dataAccess/mongoose";

export const handleGetCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    return res.send(categories);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getCategory(id);
    return res.send(category);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUpdateCategoryClicks = async (
  req: Request,
  res: Response
) => {
  try {
    const category: CategoryInterface = req.body;
    const categoryName = req.params.category_name;
    console.log("Request Body:", req.body);
    console.log("Category Name:", categoryName);

    const updatedCategory = await Category.findOneAndUpdate(
      { category_name: categoryName },
      { clicks: category.clicks },
      { new: true }
    );
    console.log("Updated Category:", updatedCategory);
    console.log(await getAllCategoriesFromMongoDB());

    return res.status(201).send("Updated Category!");
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};
