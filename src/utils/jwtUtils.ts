// jwtUtils.ts
import { sign, verify } from "jsonwebtoken";
import { DecodedToken } from "../types/types";
import UserInterface from "../users/interfaces/UserInterface";

const secretKey = "project-team1"; // Replace with your actual secret key

export const generateToken = (user: UserInterface): string => {
  return sign(user, secretKey, { expiresIn: "1h" }); // Adjust expiration as needed
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
