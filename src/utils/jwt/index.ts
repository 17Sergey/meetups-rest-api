import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getBearerToken } from "./getBearerToken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_secret_key";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key";

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

export const generateRefreshToken = (userId: number) => {
  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "2d",
  });

  const createdAt = new Date();

  const ONE_HOUR = 1;
  const expiresAt = new Date(createdAt);
  expiresAt.setHours(createdAt.getHours() + ONE_HOUR);

  return { refreshToken, createdAt, expiresAt };
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
