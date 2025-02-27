import passport from "passport";
import "@configs/passport";
import { Request, Response } from "express";
import { User } from "@prisma/client";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: VoidFunction,
) =>
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: User | false) => {
      if (err || !user) {
        res.status(401).json({ error: "Not authenticated" });
        return;
      }

      req.user = user;
      next();
    },
  )(req, res, next);
