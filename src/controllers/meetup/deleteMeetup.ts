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
    const meetup = await meetupRepository.getById(id);

    if (!meetup) {
      res.status(404).json({
        message: "Meetup not found",
      });
      return;
    }

    await meetupRepository.delete(id);

    res.status(200).json({
      message: "Meetup deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления митапа" });
  }
};
