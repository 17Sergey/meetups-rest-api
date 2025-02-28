import prismaClient from "@db/prismaClient";

class UserRoleRepository {
  async getAll() {
    return await prismaClient.userRole.findMany({});
  }

  async getById(id: number) {
    const item = await prismaClient.userRole.findUnique({
      where: { id },
    });

    return item || null;
  }

  async create(data: any) {
    const newItem = await prismaClient.userRole.create({
      data,
    });

    return newItem;
  }

  async update(id: number, data: any) {
    await prismaClient.userRole.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prismaClient.userRole.delete({
      where: { id },
    });
  }
}

export const userRoleRepository = new UserRoleRepository();
