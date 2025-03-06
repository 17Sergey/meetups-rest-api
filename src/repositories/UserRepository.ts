import prismaClient from "@db/prismaClient";

import { SignupSchema } from "@utils/dto/user";

type CreateParams = SignupSchema & {
  roleId: number;
};

class UserRepository {
  async getAll() {
    return await prismaClient.user.findMany({});
  }

  async getById(id: number) {
    const item = await prismaClient.user.findUnique({
      where: { id },
    });

    return item || null;
  }

  async getByEmail(email: string) {
    const item = await prismaClient.user.findUnique({
      where: { email },
    });

    return item || null;
  }

  async create({ email, fullName, password, roleId }: CreateParams) {
    const newItem = await prismaClient.user.create({
      data: {
        email,
        fullName,
        password,
        roleId,
      },
      omit: {
        password: true,
        roleId: true,
      },
    });

    return newItem;
  }

  async update(id: number, data: any) {
    await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prismaClient.user.delete({
      where: { id },
    });
  }
}

export const userRepository = new UserRepository();
