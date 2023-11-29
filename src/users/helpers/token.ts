import { generateToken } from "../../utils/jwtUtils";
import UserInterface from "../interfaces/UserInterface";

export const generateAuthToken = (user: UserInterface) => {
  const randomToken = generateToken(user);
  return randomToken;
};
