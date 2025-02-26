import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";
import { meetupRepository } from "src/repositories/MeetupRepository";

/**
 * @swagger
 * /meetups/{id}:
 *   get:
 *     summary: Get a meetup by ID
 *     tags: [Meetups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meetup
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A meetup object
 *       404:
 *         description: Meetup not found
 *       500:
 *         description: Internal server error
 */

export const getMeetupById = async (req: Request, res: Response) => {
  const id = req.id as number;

  try {
    const meetup = await meetupRepository.getById(id);

    if (!meetup) {
      res.status(404).json({ error: "Meetup not found" });
      return;
    }

    res.status(200).json(meetup);
  } catch (error) {
    res.status(500).json({
      error: `Error in getMeetupById controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
