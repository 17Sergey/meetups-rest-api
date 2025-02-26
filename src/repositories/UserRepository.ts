import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import prismaClient from "@db/prismaClient";
import Repository from "./Repository";

class UserRepository extends Repository {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  async getAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany({});
  }

  async getById(id: number): Promise<User | null> {
    const item = await this.prismaClient.user.findUnique({
      where: { id },
    });

    return item || null;
  }

  async create(data: any): Promise<User> {
    const newItem = await this.prismaClient.user.create({
      data,
    });

    return newItem;
  }

  async update(id: number, data: any): Promise<void> {
    await this.prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id },
    });
  }
}

export const userRepository = new UserRepository(prismaClient);
