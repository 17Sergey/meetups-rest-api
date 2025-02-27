import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";
import { meetupRepository } from "src/repositories/MeetupRepository";

/**
 * @swagger
 * /meetups:
 *   get:
 *     summary: Get all meetups
 *     tags: [Meetups]
 *     responses:
 *       200:
 *         description: A list of meetups
 *       500:
 *         description: Internal server error
 */

export const getAllMeetups = async (req: Request, res: Response) => {
  try {
    // TODO: validate
    const {
      title,
      sortField,
      sortOrder,
      page: queryPage,
      queryLimit,
    } = req.query;

    const filters = {
      title: title || undefined,
    };

    const sort = {
      field: sortField,
      order: sortOrder || "asc",
    };

    const page = Number(queryPage) || 1;
    const limit = Number(queryLimit) || 10;

    const meetups = await meetupRepository.getAll(filters, sort, page, limit);

    const totalPages = Math.ceil(meetups.length / limit);
    res.json({ meetups, totalPages });
  } catch (error) {
    const errorMessage = errorHeplers.getMessageFromUnkownError(error);
    res
      .status(500)
      .json({ error: `Error in getAllMeetups controller: ${errorMessage}` });
  }
};
