import { Request, Response } from "express";

import { meetupService } from "@services/meetup";

import { errorHeplers } from "@utils/errors/errorHelpers";

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Meetup not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export const getMeetupById = async (req: Request, res: Response) => {
  const id = req.id as number;

  try {
    const { statusCode, jsonResponse } = await meetupService.getById(id);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in getMeetupById controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
