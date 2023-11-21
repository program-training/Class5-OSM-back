import mongoose, { ObjectId } from "mongoose";
import { User } from "../users/models/mongoose/UserSchema";
import UserInterface from "../users/interfaces/UserInterface";
import { Product } from "../products/models/mongoose/ProductSchema";
import { Category } from "../categories/models/mongoose/CategorySchema";
import CategoryInterface from "../categories/interfaces/CategoryInterface";
var ObjectId1 = require("mongoose").Types.ObjectId;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://8a:123456789Aa@cluster0.pugoiz1.mongodb.net/project-team1"
    );
    return "Connected to MongoDB";
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsersFromMongoDB = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const insertUsers = async (user: UserInterface) => {
  try {
    const newUser = new User(user);
    const userFromDB = await newUser.save();
    return userFromDB;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const getAllProductsFromMongoDB = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    console.log(1);

    console.log(id);
    console.log(2);

    const product = await Product.findById(id);
    if (!product) {
      console.log("Product not found");
      return; // or throw an error or return an appropriate response
    }
    console.log(4);
    console.log(product, "65546845647854");
    return product;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("Product not found");
      return; // or throw an error or return an appropriate response
    }
    console.log(4);
    console.log(user, "65546845647854");
    return user;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const getCategoryById = async (id: string) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      console.log("Product not found");
      return; // or throw an error or return an appropriate response
    }
    console.log(4);
    console.log(category, "65546845647854");
    return category;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const getAllCategoriesFromMongoDB = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    return Promise.reject(error);
  }
};
