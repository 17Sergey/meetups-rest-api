import { User } from "@prisma/client";
import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   description: 'API for user authentication.'
 *   version: '1.0.0'
 *   title: 'Authentication API'
 * paths:
 *   /v1/auth/me:
 *     get:
 *       summary: 'Get current user'
 *       description: 'Retrieves the current authenticated user.'
 *       tags:
 *         - Authentication
 *       security:
 *         - Bearer: []
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           required: true
 *           type: string
 *           description: 'JWT token for authorization. Format: Bearer <token>'
 *       responses:
 *         200:
 *           description: 'User successfully retrieved.'
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "id": 1,
 *                 "fullName": "John Doe",
 *                 "email": "john.doe@example.com",
 *                 "role": "participant",
 *                 "refreshToken": "some_refresh_token"
 *               }
 *         401:
 *           description: 'Unauthorized.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "error": "Unauthorized"
 *               }
 */

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
