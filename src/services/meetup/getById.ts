import { meetupRepository } from "@repositories/MeetupRepository";

import { errorHeplers } from "@utils/errors/errorHelpers";

export const getById = async (meetupId: number): Promise<ServiceResult> => {
  try {
    const meetup = await meetupRepository.getById(meetupId);

    if (!meetup) {
      return {
        statusCode: 404,
        jsonResponse: { error: "Meetup not found" },
      };
    }
    const tagNames = meetup.tags.map((tag) => tag.tag.name);

    return {
      statusCode: 200,
      jsonResponse: {
        ...meetup,
        tags: tagNames,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      jsonResponse: {
        error: `Internal Server Error: ${errorHeplers.getMessageFromUnkownError(error)}`,
      },
    };
  }
};
