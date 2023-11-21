import UserInterface from "../interfaces/UserInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import {
  getCollectionFromJsonFile,
  modifyCollection,
} from "../../dataAccess/jsonfileDAL";
import chalk from "chalk";
import userValidation from "../models/joi/userRegistrationValidation";
import { getDataFromDummy } from "../../dataAccess/dummyjson";
import { addDataToJsonPlaceHolder } from "../../dataAccess/jsonPlaceHolder";
import {
  getAllUsersFromMongoDB,
  getUserById,
  insertUsers,
} from "../../dataAccess/mongoose";
import { generateAuthToken } from "../helpers/token";
import UserLoginInterface from "../interfaces/UserLoginInterface";
import { getAllUsersFromJSON } from "../../dataAccess/postgreSQL";

type UserResult = Promise<UserInterface | null>;

export const getUsers = async () => {
  try {
    const users = await getAllUsersFromJSON();
    return users;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    console.log(1.1);

    const getUserFromMDB = await getUserById(userId);
    console.log(1.2);

    return getUserFromMDB;

    // const users = await getCollectionFromJsonFile("users");
    // if (users instanceof Error)
    //   throw new Error("Oops... Could not get the users from the Database");

    // const userFromDB = users.find(
    //   (user: Record<string, unknown>) => user._id === userId
    // );

    // if (!userFromDB) throw new Error("No user with this id in the database!");
    // return userFromDB;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const register = async (user: UserInterface): UserResult => {
  try {
    const users = await getUsers();

    const userRegistered = users.find(
      (userInDB) => userInDB.email === user.email
    );
    if (userRegistered) throw new Error("This user is allready registered!");

    user.password = generateUserPassword(user.password);
    await insertUsers(user);
    // users.push({ ...user });

    await modifyCollection(
      "users",
      users as unknown as Record<string, unknown>[]
    );
    return user;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const editUser = async (
  userId: string,
  userForUpdate: UserInterface
): UserResult => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const index = users.findIndex((user) => user._id === userId);
    if (index === -1) throw new Error("Could not find user with this ID!");

    const usersCopy = [...users];
    const userToUpdate = { ...usersCopy[index], ...userForUpdate };
    usersCopy[index] = userToUpdate;

    const data = await modifyCollection("users", usersCopy);
    if (!data)
      throw new Error("Oops... something went wrong Could not Edit this user");
    return userToUpdate;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const user = users.find((user) => user._id === userId);
    if (!user) throw new Error("Could not find user with this ID!");
    const filteredUser = users.filter((user) => user._id !== userId);

    const data = await modifyCollection("users", filteredUser);
    if (!data)
      throw new Error("Oops... something went wrong Could not Edit this user");

    return user;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const login = async (userFromClient: UserLoginInterface) => {
  try {
    const users = await getAllUsersFromMongoDB();
    if (!users)
      throw new Error("Oops... Could not get the users from the Database");

    const userInDB = users.find((user) => userFromClient.email === user.email);

    if (!userInDB) throw new Error("The email or password is incorrect!");
    // const userCopy = { ...userInDB };

    if (!comparePassword(userFromClient.password, userInDB.password))
      throw new Error("The email or password is incorrect!");

    const token = generateAuthToken();
    const resInfoObj = { token: token, user: userInDB };

    return { message: "Login successful", resInfoObj };
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const addProductToUser = async (
  userId: string,
  productFromClient: string
) => {
  try {
    const user = await getUser(userId);
    // if (!user) throw new Error("Could not find this user!");

    // const data = await getDataFromDummy();
    // if (!data?.data) throw new Error("Could not get the data!");
    // const { data: dataFromDummy } = data;

    // const productFromDB = dataFromDummy.products.find(
    //   (product: Record<string, unknown>) =>
    //     typeof product.title === "string" &&
    //     product.title
    //       .toLowerCase()
    //       .trim()
    //       .includes(productFromClient.toLowerCase().trim())
    // );

    // if (!productFromDB) throw new Error("Could not found this product");
    // user.product = productFromDB;

    // const userFromJsonPlaceHolder = await addDataToJsonPlaceHolder(
    //   user,
    //   "users"
    // );
    // if (!userFromJsonPlaceHolder)
    //   throw new Error("Could not add this user to jsonplaceholder database");

    // return userFromJsonPlaceHolder;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error)
      console.log(chalk.redBright(error.message));
    return Promise.reject(error);
  }
};
