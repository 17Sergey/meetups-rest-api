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
 *   /v1/meetups:
 *     post:
 *       summary: 'Create a new meetup'
 *       description: 'Creates a new meetup for developers. Available only for authorized users with the role "organizer".'
 *       tags:
 *         - Meetups
 *       security:
 *         - Bearer: []
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           description: 'Data for creating a meetup.'
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 description: 'Title of the meetup (required).'
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: 'Description of the meetup (required).'
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: 'Date and time of the meetup in ISO format (required).'
 *               location:
 *                 type: string
 *                 maxLength: 200
 *                 description: 'Location of the meetup (required).'
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 'Tags for the meetup (optional).'
 *         - in: header
 *           name: Authorization
 *           required: true
 *           type: string
 *           description: 'JWT token for authorization. Format: Bearer <token>'
 *       responses:
 *         201:
 *           description: 'Meetup successfully created.'
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: 'Identifier of the created meetup.'
 *               title:
 *                 type: string
 *                 description: 'Title of the meetup.'
 *               description:
 *                 type: string
 *                 description: 'Description of the meetup.'
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: 'Date and time of the meetup.'
 *               location:
 *                 type: string
 *                 description: 'Location of the meetup.'
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 'Tags for the meetup.'
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

export const createMeetup = async (req: Request, res: Response) => {
  try {
    const { statusCode, jsonResponse } = await meetupService.create(req.body);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error creating meetup: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
