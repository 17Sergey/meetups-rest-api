import { meetupService } from "@services/meetup";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";
import { meetupRepository } from "src/repositories/MeetupRepository";

/**
 * @swagger
 * /meetups/{id}:
 *   delete:
 *     summary: Delete a meetup
 *     tags: [Meetups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meetup
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Meetup deleted
 *       404:
 *         description: Meetup not found
 *       500:
 *         description: Internal server error
 */
export const deleteMeetup = async (req: Request, res: Response) => {
  const id = req.id as number;

  try {
    const { statusCode, jsonResponse } = await meetupService.deleteMeetup(id);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in deleteMeetupController: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
