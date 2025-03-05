import prismaClient from "@db/prismaClient";
import { meetupRepository } from "@repositories/MeetupRepository";
import { meetupTagsService } from "@services/meetupTags";
import { tagsService } from "@services/tag";

export const deleteMeetup = async (
  meetupId: number,
): Promise<ServiceResult> => {
  const meetup = await meetupRepository.getById(meetupId);

  if (!meetup) {
    return {
      statusCode: 404,
      jsonResponse: { message: "Meetup not found" },
    };
  }

  const tagsIds = meetup.tags.map((meetupTag) => meetupTag.tagId);

  const transactionLogic = async () => {
    await meetupTagsService.deleteManyByMeetupId(meetupId);
    await meetupRepository.delete(meetupId);
    await tagsService.checkAndDeleteUnusedTags(tagsIds);

    return {
      statusCode: 200,
      jsonResponse: {
        message: "Meetup deleted successfully",
      },
    };
  };

  return await prismaClient.$transaction(transactionLogic);
};
