import {
  getUsers,
  getUser,
  register,
  editUser,
  deleteUser,
  login,
} from "../services/usersApiService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userRegistrationValidation";
import { Request, Response } from "express";
import userLoginValidation from "../models/joi/userLoginValidation";
import userRegistrationValidation from "../models/joi/userRegistrationValidation";
import UserInterface from "../interfaces/UserInterface";
import UserLoginInterface from "../interfaces/UserLoginInterface";

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const user = await getUser(userId);
    return res.send(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const user: UserInterface = req.body;

    const { error } = userRegistrationValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const userFromDB = await register(user);
    return res.status(201).send(userFromDB);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleEditUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: UserInterface = req.body;

    const { error } = userValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const userFromDB = await editUser(id, user);
    return res.send(userFromDB);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const userFromClient: UserLoginInterface = req.body;

    const { error } = userLoginValidation(userFromClient);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const token = await login(userFromClient);
    return res.send(token);
  } catch (error) {
    handleError(res, error, 401);
  }
};
