import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullName:
 *                   type: string
 *       400:
 *         description: Invalid input
 *
 **/

export const signup = async (req: Request, res: Response) => {
  try {
    const { statusCode, jsonResponse } = await userService.signup(req.body);
    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in signup controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
