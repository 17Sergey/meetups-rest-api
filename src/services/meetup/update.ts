import prismaClient from "@db/prismaClient";

import { meetupRepository } from "@repositories/MeetupRepository";

import { meetupTagsService } from "@services/meetupTags";

import { UpdateMeetupSchema } from "@utils/dto/meetup";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { omitObjectKeys } from "@utils/omitObjectKeys";

import { meetupService } from ".";

export const update = async (
  meetupId: number,
  data: UpdateMeetupSchema,
): Promise<ServiceResult> => {
  try {
    const meetupData = omitObjectKeys(data, ["tags"]);
    const newTagNames = data.tags || [];

    const transactionLogic = async () => {
      const updatedMeetup = await meetupRepository.update(meetupId, meetupData);

      const oldTags = updatedMeetup.tags.map((tag) => tag.tag);
      await meetupTagsService.updateTags(meetupId, oldTags, newTagNames);

      const { statusCode, jsonResponse } =
        await meetupService.getById(meetupId);

      return {
        statusCode,
        jsonResponse,
      };
    };

    return await prismaClient.$transaction(transactionLogic);
  } catch (error) {
    return {
      statusCode: 500,
      jsonResponse: {
        error: `Internal Server Error: ${errorHeplers.getMessageFromUnkownError(error)}`,
      },
    };
  }
};
