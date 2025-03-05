import { Request, Response } from "express";
import { userService } from "@services/auth";
import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *
 **/

export const login = async (req: Request, res: Response) => {
  try {
    const { statusCode, jsonResponse } = await userService.login(req.body);
    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in login controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
