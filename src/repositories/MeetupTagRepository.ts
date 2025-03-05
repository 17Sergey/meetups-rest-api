import prismaClient from "@db/prismaClient";
import { MeetupTag } from "@prisma/client";

class MeetupTagRepository {
  async getAllByMeetupId(meetupId: number) {
    const items = await prismaClient.meetupTag.findMany({
      where: { meetupId },
    });

    return items || [];
  }

  async createMany(data: MeetupTag[]) {
    return await prismaClient.meetupTag.createMany({
      data,
    });
  }

  async delete(meetupId: number, tagId: number) {
    const existingRelation = await prismaClient.meetupTag.findUnique({
      where: { meetupId_tagId: { meetupId, tagId } },
    });

    if (!existingRelation) {
      return null;
    }

    return await prismaClient.meetupTag.delete({
      where: { meetupId_tagId: { meetupId, tagId } },
    });
  }

  async deleteManyByMeetupId(meetupId: number) {
    return await prismaClient.meetupTag.deleteMany({
      where: { meetupId: meetupId },
    });
  }

  async countByTagId(tagId: number) {
    const count = await prismaClient.meetupTag.count({
      where: { tagId },
    });

    return count;
  }
}

export const meetupTagRepository = new MeetupTagRepository();
