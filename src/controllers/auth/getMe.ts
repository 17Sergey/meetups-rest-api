import { User } from "@prisma/client";
import { userService } from "@services/auth";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 *
 **/
export const getMe = async (req: Request, res: Response) => {
  try {
    const requestUser = req.user as User;

    const { statusCode, jsonResponse } = await userService.getMe(requestUser);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      message: `Error in getMe controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
