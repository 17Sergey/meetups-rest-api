import { Request, Response } from "express";
import { prisma } from "@db/prismaClient";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        roleId: 1,
      },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Ошибка регистрации пользователя" });
  }
};
