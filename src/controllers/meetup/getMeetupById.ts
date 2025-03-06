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
 *     get:
 *       summary: 'Get a meetup by ID'
 *       description: 'Retrieves a specific meetup by its ID.'
 *       tags:
 *         - Meetups
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: integer
 *           description: 'ID of the meetup to retrieve (required). It must be a positive integer.'
 *           example: 1
 *         - in: header
 *           name: Authorization
 *           required: true
 *           type: string
 *           description: 'JWT token for authorization. Format: Bearer <token>'
 *       responses:
 *         200:
 *           description: 'Meetup successfully retrieved.'
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: 'Identifier of the meetup.'
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *           examples:
 *             application/json:
 *               {
 *                 "id": 1,
 *                 "title": "Tech Conference 2023",
 *                 "description": "Annual tech conference for developers.",
 *                 "dateTime": "2023-10-15T10:00:00Z",
 *                 "location": "San Francisco, CA",
 *                 "tags": ["technology", "conference"]
 *               }
 *         404:
 *           description: 'Meetup not found.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Error message.'
 *           examples:
 *             application/json:
 *               {
 *                 "error": "Meetup not found"
 *               }
 *         500:
 *           description: 'Internal server error.'
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: 'Error message.'
 *           examples:
 *             application/json:
 *               {
 *                 "error": "Internal Server Error"
 *               }
 */

export const getMeetupById = async (req: Request, res: Response) => {
  const id = req.id as number;

  try {
    const { statusCode, jsonResponse } = await meetupService.getById(id);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in getMeetupById controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
