import UserInterface from "../interfaces/UserInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";

import chalk from "chalk";
import userValidation from "../models/joi/userRegistrationValidation";
import {
  // getAllUsersFromMongoDB,
  getUserById,
  // insertUsers,
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
    // await insertUsers(user);
    // users.push({ ...user });

    // await modifyCollection(
    //   "users",
    //   users as unknown as Record<string, unknown>[]
    // );
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
    const users = await getAllUsersFromJSON();
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const index = users.findIndex((user) => user._id === userId);
    if (index === -1) throw new Error("Could not find user with this ID!");

    const usersCopy = [...users];
    const userToUpdate = { ...usersCopy[index], ...userForUpdate };
    usersCopy[index] = userToUpdate;

    // const data = await modifyCollection("users", usersCopy);
    // if (!data)
    //   throw new Error("Oops... something went wrong Could not Edit this user");
    return userToUpdate;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const users = await getAllUsersFromJSON();
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const user = users.find((user) => user._id === userId);
    if (!user) throw new Error("Could not find user with this ID!");
    const filteredUser = users.filter((user) => user._id !== userId);

    // const data = await modifyCollection("users", filteredUser);
    // if (!data)
    //   throw new Error("Oops... something went wrong Could not Edit this user");

    return user;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const login = async (userFromClient: UserLoginInterface) => {
  try {
    const users = await getAllUsersFromJSON();
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
