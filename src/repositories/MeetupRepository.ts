import prismaClient from "@db/prismaClient";

import { GetAllMeetups } from "@services/meetup/getAll";

import {
  CreateMeetupSchema,
  UpdateMeetupSchema,
} from "@utils/dto/meetup/index";

type GetCount = {
  searchField?: string;
  searchValue?: string;
};

class MeetupRepository {
  async getAll({
    page,
    limit,
    sortField,
    sortOrder,
    searchField,
    searchValue,
  }: GetAllMeetups) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = page && limit ? limit : undefined;

    const orderBy = sortField
      ? {
          [sortField]: sortOrder,
        }
      : undefined;

    const where =
      searchValue && searchField
        ? { [searchField]: { contains: searchValue, mode: "insensitive" } }
        : undefined;

    return await prismaClient.meetup.findMany({
      skip,
      take,
      orderBy,
      where,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async getCount({ searchField, searchValue }: GetCount) {
    const where =
      searchValue && searchField
        ? { [searchField]: { contains: searchValue, mode: "insensitive" } }
        : undefined;
    return await prismaClient.meetup.count({ where });
  }

  async getById(id: number) {
    const item = await prismaClient.meetup.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return item || null;
  }

  async create(data: Omit<CreateMeetupSchema, "tags">) {
    const newItem = await prismaClient.meetup.create({
      data: {
        ...data,
        dateTime: new Date(data.dateTime),
      },
    });

    return newItem;
  }

  async update(id: number, data: Omit<UpdateMeetupSchema, "tags">) {
    const { dateTime } = data;

    return await prismaClient.meetup.update({
      where: { id },
      data: {
        ...data,
        dateTime: dateTime ? new Date(dateTime) : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    await prismaClient.meetup.delete({
      where: { id },
    });
  }
}

export const meetupRepository = new MeetupRepository();
