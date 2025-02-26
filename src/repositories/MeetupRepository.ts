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

  async getAll(): Promise<Meetup[]> {
    return await this.prismaClient.meetup.findMany({});
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
}

export const meetupRepository = new MeetupRepository(prismaClient);
