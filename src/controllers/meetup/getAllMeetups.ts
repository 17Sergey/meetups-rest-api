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
    const meetups = await meetupRepository.getAll();
    res.json(meetups);
  } catch (error) {
    const errorMessage = errorHeplers.getMessageFromUnkownError(error);
    res
      .status(500)
      .json({ error: `Error in getAllMeetups controller: ${errorMessage}` });
  }
};

// export const getAllMeetups = async (req: Request, res: Response) => {
//   try {
//     const { page = 1, limit = 10, search } = req.query;

//     const pageNum = parseInt(page as string, 10);
//     const limitNum = parseInt(limit as string, 10);

//     const skip = (pageNum - 1) * limitNum;

//     const where = search
//       ? {
//           OR: [
//             { title: { contains: search as string, mode: "insensitive" } },
//             {
//               description: { contains: search as string, mode: "insensitive" },
//             },
//           ],
//         }
//       : {};

//     const meetups = await prismaClient.meetup.findMany({
//       // @ts-ignore: TODO: fix types for where
//       where,
//       skip,
//       take: limitNum,
//     });

//     // @ts-ignore: TODO: fix types for where
//     const totalMeetups = await prisma.meetup.count({ where });

//     res.json({
//       meetups,
//       total: totalMeetups,
//       page: pageNum,
//       totalPages: Math.ceil(totalMeetups / limitNum),
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Ошибка получения митапов" });
//   }
// };
