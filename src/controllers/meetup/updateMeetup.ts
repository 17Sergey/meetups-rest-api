import prismaClient from "@db/prismaClient";
import { meetupRepository } from "@repositories/MeetupRepository";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";

/**
 * @swagger
 * /meetups/{id}:
 *   put:
 *     summary: Update a meetup
 *     tags: [Meetups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meetup
 *         schema:
 *           type: integer
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
 *       200:
 *         description: The updated meetup
 *       404:
 *         description: Meetup not found
 *       500:
 *         description: Internal server error
 */
export const updateMeetup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedMeetup = await meetupRepository.update(Number(id), data);
    res.json(updatedMeetup);
  } catch (error) {
    res.status(500).json({
      error: `Error updating meetup: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
