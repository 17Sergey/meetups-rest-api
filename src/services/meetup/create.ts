import prismaClient from "@db/prismaClient";

import { meetupRepository } from "@repositories/MeetupRepository";

import { meetupTagsService } from "@services/meetupTags";
import { tagsService } from "@services/tag";

import { CreateMeetupSchema } from "@utils/dto/meetup";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { omitObjectKeys } from "@utils/omitObjectKeys";

export const create = async (
  data: CreateMeetupSchema,
): Promise<ServiceResult> => {
  try {
    const transactionLogic = async () => {
      const meetupData = omitObjectKeys(data, ["tags"]);
      const newMeetup = await meetupRepository.create(meetupData);

      const tags = data.tags || [];

      if (tags && tags.length > 0) {
        const { tagsIds } = await tagsService.createTags(tags || []);

        await meetupTagsService.addMeetupTags({
          meetupId: newMeetup.id,
          tagsIds,
        });
      }

      return {
        statusCode: 201,
        jsonResponse: {
          ...newMeetup,
          tags: tags,
        },
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
