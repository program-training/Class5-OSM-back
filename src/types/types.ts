// types.ts
export interface User {
  id: string;
  username: string;
}

export interface JWTPayload {
  user: User;
}

export interface DecodedToken extends JWTPayload {
  iat: number;
  exp: number;
}
