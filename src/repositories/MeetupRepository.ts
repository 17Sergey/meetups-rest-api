import { Meetup } from "@prisma/client";
import {
  CreateMeetupSchema,
  UpdateMeetupSchema,
} from "@utils/dto/meetup/index";
import { PrismaClient } from "@prisma/client/extension";
import prismaClient from "@db/prismaClient";
import Repository from "./Repository";

class MeetupRepository extends Repository {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  async getAll(
    filters?: any,
    sort?: any,
    page?: number,
    limit?: number,
  ): Promise<Meetup[]> {
    const where = filters ? this.buildWhereClause(filters) : {};
    const orderBy = sort ? this.buildSortClause(sort) : {};
    const skip = page && limit ? (page - 1) * limit : 0;

    return await this.prismaClient.meetup.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });
  }

  async getById(id: number): Promise<Meetup | null> {
    const item = await this.prismaClient.meetup.findUnique({
      where: { id },
    });

    return item || null;
  }

  async create(data: CreateMeetupSchema): Promise<Meetup> {
    const newItem = await this.prismaClient.meetup.create({
      data: {
        ...data,
        dateTime: new Date(data.dateTime),
      },
    });

    return newItem;
  }

  async update(id: number, data: UpdateMeetupSchema): Promise<void> {
    const { dateTime } = data;

    await this.prismaClient.meetup.update({
      where: { id },
      data: {
        ...data,
        dateTime: dateTime ? new Date(dateTime) : undefined,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaClient.meetup.delete({
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

export const meetupRepository = new MeetupRepository(prismaClient);
