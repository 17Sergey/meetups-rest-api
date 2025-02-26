import { Request, Response } from "express";
import { prisma } from "@db/prismaClient";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(400).json({ error: "Пользователь не найден" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(403).json({ error: "Неверный пароль" });
    return;
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.json({ accessToken, refreshToken });
};
