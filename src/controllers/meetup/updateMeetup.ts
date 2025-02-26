import prismaClient from "@db/prismaClient";
import { updateMeetupSchema } from "@utils/dto/meetup";
import { Request, Response } from "express";
import z from "zod";

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
  const validatedData = updateMeetupSchema.parse(req.body);
  const { title, description, dateTime, location } = validatedData;

  try {
    const updatedMeetup = await prismaClient.meetup.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dateTime: dateTime ? new Date(dateTime) : undefined,
        location,
      },
    });
    res.json(updatedMeetup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: "Ошибка обновления митапа" });
    }
  }
};
