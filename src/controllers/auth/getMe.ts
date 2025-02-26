import { Request, Response } from "express";
import prismaClient from "@db/prismaClient";

export const getMe = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  res.json(user);
};
