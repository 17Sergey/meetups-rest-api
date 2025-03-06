import { Tag } from "@prisma/client";

import prismaClient from "@db/prismaClient";

class TagRepository {
  async getAll() {
    return await prismaClient.tag.findMany({});
  }

  async getByNames(neededTagNames: string[]) {
    return await prismaClient.tag.findMany({
      where: { name: { in: neededTagNames } },
    });
  }

  async getById(id: number) {
    const item = await prismaClient.tag.findUnique({
      where: { id },
    });

    return item || null;
  }

  async getByName(name: string) {
    const item = await prismaClient.tag.findUnique({
      where: { name },
    });

    return item || null;
  }

  async create(data: Omit<Tag, "id">) {
    const newItem = await prismaClient.tag.create({
      data,
    });

    return newItem;
  }

  async createMany(data: Omit<Tag, "id">[]) {
    const newItem = await prismaClient.tag.createMany({
      data,
      skipDuplicates: true,
    });

    return newItem;
  }

  async update(id: number, data: Omit<Tag, "id">) {
    await prismaClient.tag.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prismaClient.tag.delete({
      where: { id },
    });
  }
}

export const tagRepository = new TagRepository();
