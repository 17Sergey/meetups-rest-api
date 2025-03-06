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
 *     put:
 *       summary: 'Update an existing meetup'
 *       description: 'Updates an existing meetup for developers. Available only for authorized users with the role "organizer".'
 *       tags:
 *         - Meetups
 *       security:
 *         - Bearer: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: integer
 *           description: 'ID of the meetup to update (required).'
 *         - in: body
 *           name: body
 *           required: true
 *           description: 'Data for updating the meetup. All fields are optional.'
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 description: 'Title of the meetup (optional).'
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: 'Description of the meetup (optional).'
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: 'Date and time of the meetup in ISO format (optional).'
 *               location:
 *                 type: string
 *                 maxLength: 200
 *                 description: 'Location of the meetup (optional).'
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
 *         200:
 *           description: 'Meetup successfully updated.'
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: 'Identifier of the updated meetup.'
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

export const updateMeetup = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const { statusCode, jsonResponse } = await meetupService.update(id, data);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error updating meetup: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
