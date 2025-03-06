import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * paths:
 *   /v1/auth/refresh:
 *     post:
 *       summary: 'Refresh access token'
 *       description: 'Uses a refresh token to obtain a new access token.'
 *       tags:
 *         - Authentication
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "refreshToken": "some_refresh_token"
 *               }
 *       responses:
 *         200:
 *           description: 'Access token successfully refreshed.'
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "accessToken": "new_access_token"
 *               }
 *         403:
 *           description: 'Invalid refresh token.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *           examples:
 *             application/json:
 *               {
 *                 "error": "Invalid refresh token"
 *               }
 */

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;

    const { statusCode, jsonResponse } =
      await userService.refresh(refreshToken);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in refresh controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
