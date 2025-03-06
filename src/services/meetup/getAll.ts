import { meetupRepository } from "@repositories/MeetupRepository";

import { errorHeplers } from "@utils/errors/errorHelpers";

export type GetAllMeetups = {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: SortOrder;
  searchField?: string;
  searchValue?: string;
};

export const getAll = async ({
  page,
  limit,
  sortField,
  sortOrder,
  searchField,
  searchValue,
}: GetAllMeetups): Promise<ServiceResult> => {
  try {
    const meetups = await meetupRepository.getAll({
      page,
      limit,
      sortField,
      sortOrder,
      searchField,
      searchValue,
    });

    const meetupsWithTags = meetups.map((meetup) => {
      const tagNames = meetup.tags.map((tag) => tag.tag.name);
      return {
        ...meetup,
        tags: tagNames,
      };
    });

    const totalCount = await meetupRepository.getCount({
      searchField,
      searchValue,
    });
    const totalPages = limit ? Math.ceil(totalCount / limit) : undefined;

    return {
      statusCode: 200,
      jsonResponse: {
        meetups: meetupsWithTags,
        pagination:
          page && limit
            ? {
                totalCount,
                totalPages,
                page,
                limit,
              }
            : undefined,
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
