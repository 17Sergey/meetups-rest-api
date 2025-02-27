import { Request, Response } from "express";
import prismaClient from "@db/prismaClient";
import { User } from "@prisma/client";

export const getMe = async (req: Request, res: Response) => {
  res.json(req.user || { message: "Works fine" });
};
