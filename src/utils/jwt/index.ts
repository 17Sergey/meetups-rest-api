import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getBearerToken } from "./getBearerToken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your_secret_key";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_secret_key";

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: Function,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && getBearerToken(authHeader);

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    next();
  });
};
