import { Request, Response } from "express";

import { meetupService } from "@services/meetup";

import { errorHeplers } from "@utils/errors/errorHelpers";

/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   description: 'API for managing developer meetups.'
 *   version: '1.0.0'
 *   title: 'Meetup API'
 * paths:
 *   /v1/meetups/{id}:
 *     delete:
 *       summary: 'Delete an existing meetup'
 *       description: 'Deletes an existing meetup. Available only for authorized users with the role "organizer".'
 *       tags:
 *         - Meetups
 *       security:
 *         - Bearer: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: integer
 *           description: 'ID of the meetup to delete (required).'
 *         - in: header
 *           name: Authorization
 *           required: true
 *           type: string
 *           description: 'JWT token for authorization. Format: Bearer <token>'
 *       responses:
 *         200:
 *           description: 'Meetup successfully deleted.'
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: 'Success message.'
 *         400:
 *           description: 'Validation error.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Error message.'
 *         401:
 *           description: 'Unauthorized: no token provided.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Authorization error.'
 *         403:
 *           description: 'Forbidden: access denied.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Access error.'
 *         404:
 *           description: 'Meetup not found.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Error message.'
 *         500:
 *           description: 'Internal server error.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Error message.'
 *
 * definitions:
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */

export const deleteMeetup = async (req: Request, res: Response) => {
  const id = req.id as number;

  try {
    const { statusCode, jsonResponse } = await meetupService.deleteMeetup(id);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in deleteMeetupController: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
