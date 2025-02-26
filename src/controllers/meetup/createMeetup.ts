import { createMeetupSchema } from "@utils/dto/meetup";
import { Request, Response } from "express";
import { meetupRepository } from "src/repositories/MeetupRepository";
import z from "zod";

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
  const validatedData = createMeetupSchema.parse(req.body);

  try {
    const newMeetup = await meetupRepository.create(validatedData);

    res.status(201).json(newMeetup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: "Ошибка создания митапа" });
    }
  }
};
