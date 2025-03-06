import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * paths:
 *   /v1/auth/login:
 *     post:
 *       summary: 'User login'
 *       description: 'Authenticates a user and returns tokens.'
 *       tags:
 *         - Authentication
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "email": "jane.doe@example.com",
 *                 "password": "Password123!"
 *               }
 *       responses:
 *         200:
 *           description: 'User successfully logged in.'
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
 *                   role:
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
 *                   "email": "jane.doe@example.com",
 *                   "role": "participant"
 *                 },
 *                 "accessToken": "some_access_token",
 *                 "refreshToken": "some_refresh_token"
 *               }
 *         403:
 *           description: 'Invalid credentials.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "error": "Invalid credentials"
 *               }
 */

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
