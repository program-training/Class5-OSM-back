import UserInterface from "../interfaces/UserInterface";
import {
  getUsers as getUsersService,
  register,
  login as loginService,
} from "../services/usersApiService";
import UserLoginInterface from "../interfaces/UserLoginInterface";

export const getUsers = async () => await getUsersService();
export const login = async (_: never, { user }: { user: UserLoginInterface }) =>
  await loginService(user);

export const createUser = async (_: never, { user }: { user: UserInterface }) =>
  await register(user);
