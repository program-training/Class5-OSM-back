import UserInterface from "../interfaces/UserInterface";
import {
  getUsers as getUsersService,
  register,
  login as loginService,
} from "../services/usersApiService";
import UserLoginInterface from "../interfaces/UserLoginInterface";

export const getUsers = async () => await getUsersService();
export const login = async (_: any, { user }: { user: UserLoginInterface }) =>
  await loginService(user);

export const createUser = async (_: any, { user }: { user: UserInterface }) =>
  await register(user);
