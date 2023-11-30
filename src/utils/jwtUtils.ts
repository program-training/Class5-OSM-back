// jwtUtils.ts
import { sign, verify } from "jsonwebtoken";
import { DecodedToken } from "../types/types";
import UserInterface from "../users/interfaces/UserInterface";

const secretKey = "project-team1";

export const generateToken = ({ isAdmin, _id }: UserInterface): string => {
  return sign({ isAdmin, _id }, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = verify(token, secretKey) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
