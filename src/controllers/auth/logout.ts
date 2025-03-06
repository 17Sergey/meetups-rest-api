import { User } from "@prisma/client";
import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * paths:
 *   /v1/auth/logout:
 *     post:
 *       summary: 'User logout'
 *       description: 'Logs out the current user and invalidates tokens.'
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
 *           description: 'Logout successful.'
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "message": "Logout successful"
 *               }
 *         400:
 *           description: 'Logout failed.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "error": "Logout failed: user already logged out"
 *               }
 */

export const logout = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const { statusCode, jsonResponse } = await userService.logout(id);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in logout controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
