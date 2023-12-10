import { createUser, getUsers, login } from "./userResolvers";

export const userQueries = {
  getUsers,
};

export const usersMutation = {
  createUser,
  login,
};
