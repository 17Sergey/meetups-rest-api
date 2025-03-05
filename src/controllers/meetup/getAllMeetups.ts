import { meetupService } from "@services/meetup";
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
    const page = Number(req.query.page) || undefined;
    const limit = Number(req.query.limit) || undefined;

    const sortField = req.query.sortField
      ? String(req.query.sortField)
      : undefined;
    const sortOrder = (req.query.sortOrder as SortOrder) || "asc";

    const searchField = req.query.searchField
      ? String(req.query.searchField)
      : undefined;
    const searchValue = req.query.searchValue
      ? String(req.query.searchValue)
      : undefined;

    const { statusCode, jsonResponse } = await meetupService.getAll({
      page,
      limit,
      sortField,
      sortOrder,
      searchField,
      searchValue,
    });

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    const errorMessage = errorHeplers.getMessageFromUnkownError(error);
    res
      .status(500)
      .json({ error: `Error in getAllMeetups controller: ${errorMessage}` });
  }
};
