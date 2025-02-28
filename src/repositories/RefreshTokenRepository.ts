import prismaClient from "@db/prismaClient";
import { RefreshToken } from "@prisma/client";

class RefreshTokenRepository {
  async getAll() {
    return await prismaClient.refreshToken.findMany({});
  }

  async getById(id: number) {
    const item = await prismaClient.refreshToken.findUnique({
      where: { id },
    });

    return item || null;
  }

  async getByUserId(userId: number) {
    const item = await prismaClient.refreshToken.findUnique({
      where: { userId },
    });

    return item || null;
  }

  async getByToken(refreshToken: string) {
    const item = await prismaClient.refreshToken.findFirst({
      where: { refreshToken },
    });

    return item || null;
  }

  async create(data: Omit<RefreshToken, "id">) {
    const newItem = await prismaClient.refreshToken.create({
      data,
    });

    return newItem;
  }

  async update(id: number, data: any) {
    await prismaClient.refreshToken.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prismaClient.refreshToken.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: number) {
    await prismaClient.refreshToken.delete({
      where: { userId },
    });
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
