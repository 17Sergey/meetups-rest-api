import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";
import { meetupRepository } from "src/repositories/MeetupRepository";

/**
 * @swagger
 * /meetups:
 *   post:
 *     summary: Create a new meetup
 *     tags: [Meetups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created meetup
 *       500:
 *         description: Internal server error
 */
export const createMeetup = async (req: Request, res: Response) => {
  try {
    const newMeetup = await meetupRepository.create(req.body);

    res.status(201).json(newMeetup);
  } catch (error) {
    res.status(500).json({
      error: `Error creating meetup: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
