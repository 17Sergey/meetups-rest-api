import { NextFunction, Request, Response } from "express";
import { getBearerToken } from "@utils/jwt/getBearerToken";
import jwt from "jsonwebtoken";
import { userRepository } from "@repositories/UserRepository";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { ACCESS_TOKEN_SECRET } from "@utils/jwt";
import { accessTokenService } from "@services/accessToken";
import { accessTokenRepository } from "@repositories/AccessTokenRepository";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && getBearerToken(authHeader);

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({
        error: `Unauthorized: invalid token. ${errorHeplers.getMessageFromUnkownError(err)}`,
      });
      return;
    }

    if (decoded) {
      const user = await userRepository.getById(decoded.id);
      if (!user) {
        res.status(404).json({ error: "Unauthorized: User not found" });
        return;
      }

      const storedToken = await accessTokenRepository.getByUserId(decoded.id);
      if (!storedToken) {
        res
          .status(403)
          .json({ error: "Unauthorized: access token unavailiable" });
        return;
      }

      req.user = user;
      next();
    } else {
      res.status(403).json({ error: "Unauthorized: invalid token" });
      return;
    }
  });
};
