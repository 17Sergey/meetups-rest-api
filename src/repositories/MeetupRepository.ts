import {
  CreateMeetupSchema,
  UpdateMeetupSchema,
} from "@utils/dto/meetup/index";
import prismaClient from "@db/prismaClient";

class MeetupRepository {
  async getAll(filters?: any, sort?: any, page?: number, limit?: number) {
    const where = filters ? this.buildWhereClause(filters) : {};
    const orderBy = sort ? this.buildSortClause(sort) : {};
    const skip = page && limit ? (page - 1) * limit : 0;

    return await prismaClient.meetup.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });
  }

  async getById(id: number) {
    const item = await prismaClient.meetup.findUnique({
      where: { id },
    });

    return item || null;
  }

  async create(data: CreateMeetupSchema) {
    const newItem = await prismaClient.meetup.create({
      data: {
        ...data,
        dateTime: new Date(data.dateTime),
      },
    });

    return newItem;
  }

  async update(id: number, data: UpdateMeetupSchema) {
    const { dateTime } = data;

    await prismaClient.meetup.update({
      where: { id },
      data: {
        ...data,
        dateTime: dateTime ? new Date(dateTime) : undefined,
      },
    });
  }

  async delete(id: number) {
    await prismaClient.meetup.delete({
      where: { id },
    });
  }

  private buildWhereClause(filters: any) {
    const where = {};
    if (filters.title) {
      //@ts-ignore
      where.title = { contains: filters.title, mode: "insensitive" };
    }
    return where;
  }

  private buildSortClause(sort: any) {
    const orderBy = [];
    if (sort.field) {
      orderBy.push({ [sort.field]: sort.order || "asc" });
    }
    return orderBy;
  }
}

export const meetupRepository = new MeetupRepository();
