import prismaClient from "@db/prismaClient";
import { AccessToken } from "@prisma/client";

class AccessTokenRepository {
  async getAll() {
    return await prismaClient.accessToken.findMany({});
  }

  async getById(id: number) {
    const item = await prismaClient.accessToken.findUnique({
      where: { id },
    });

    return item || null;
  }

  async getByUserId(userId: number) {
    console.log(userId);

    const item = await prismaClient.accessToken.findUnique({
      where: { userId },
    });

    console.log(item);

    return item || null;
  }

  async getByToken(accessToken: string) {
    const item = await prismaClient.accessToken.findFirst({
      where: { accessToken },
    });

    return item || null;
  }

  async create(data: Omit<AccessToken, "id">) {
    const newItem = await prismaClient.accessToken.create({
      data,
    });

    return newItem;
  }

  async update(id: number, data: any) {
    await prismaClient.accessToken.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prismaClient.accessToken.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: number) {
    await prismaClient.accessToken.delete({
      where: { userId },
    });
  }
}

export const accessTokenRepository = new AccessTokenRepository();
