import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";
import { setJwtCookie } from "@utils/jwt";

/**
 * @swagger
 * paths:
 *   /v1/auth/signup:
 *     post:
 *       summary: 'User signup'
 *       description: 'Creates a new user account.'
 *       tags:
 *         - Authentication
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [participant, organizer]
 *           examples:
 *             application/json:
 *               {
 *                 "fullName": "Jane Doe",
 *                 "email": "jane.doe@example.com",
 *                 "password": "Password123!",
 *                 "role": "participant"
 *               }
 *       responses:
 *         201:
 *           description: 'User successfully created.'
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *               accessToken:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "user": {
 *                   "id": 1,
 *                   "email": "jane.doe@example.com"
 *                 },
 *                 "accessToken": "some_access_token",
 *                 "refreshToken": "some_refresh_token"
 *               }
 *         400:
 *           description: 'Bad request.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "error": "User with this email already exists"
 *               }
 */

export const signup = async (req: Request, res: Response) => {
  try {
    const { statusCode, jsonResponse } = await userService.signup(req.body);

    if (jsonResponse.refreshToken) {
      setJwtCookie(res, jsonResponse.refreshToken as string);
    }

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in signup controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
