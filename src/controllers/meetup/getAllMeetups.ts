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
 *     get:
 *       summary: 'Get all meetups'
 *       description: 'Retrieves a list of meetups with optional pagination, sorting, and filtering. Sorting and searching can only be performed on the following fields: title, description, location, and dateTime.'
 *       tags:
 *         - Meetups
 *       parameters:
 *         - in: query
 *           name: page
 *           required: false
 *           type: integer
 *           description: 'Page number for pagination (default is 1). Must be a positive integer.'
 *           example: 1
 *         - in: query
 *           name: limit
 *           required: false
 *           type: integer
 *           description: 'Number of meetups to return per page (default is 5). Must be a positive integer.'
 *           example: 5
 *         - in: query
 *           name: sortField
 *           required: false
 *           type: string
 *           enum: [title, description, location, dateTime]
 *           description: 'Field to sort the meetups (default is title). Allowed fields: title, description, location, dateTime.'
 *           example: title
 *         - in: query
 *           name: sortOrder
 *           required: false
 *           type: string
 *           enum: [asc, desc]
 *           description: 'Order to sort the meetups (default is asc). Allowed values: asc, desc.'
 *           example: asc
 *         - in: query
 *           name: searchField
 *           required: false
 *           type: string
 *           enum: [title, description, location, dateTime]
 *           description: 'Field to search in. Allowed fields: title, description, location, dateTime.'
 *           example: title
 *         - in: query
 *           name: searchValue
 *           required: false
 *           type: string
 *           description: 'Value to search for in the specified search field.'
 *           example: "Tech"
 *       responses:
 *         200:
 *           description: 'List of meetups successfully retrieved.'
 *           schema:
 *             type: object
 *             properties:
 *               meetups:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 'Identifier of the meetup.'
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     dateTime:
 *                       type: string
 *                       format: date-time
 *                     location:
 *                       type: string
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *               total:
 *                 type: integer
 *                 description: 'Total number of meetups available.'
 *           examples:
 *             application/json:
 *               {
 *                 "meetups": [
 *                   {
 *                     "id": 1,
 *                     "title": "Tech Conference 2023",
 *                     "description": "Annual tech conference for developers.",
 *                     "dateTime": "2023-10-15T10:00:00Z",
 *                     "location": "San Francisco, CA",
 *                     "tags": ["technology", "conference"]
 *                   },
 *                   {
 *                     "id": 2,
 *                     "title": "Web Development Workshop",
 *                     "description": "Hands-on workshop for web developers.",
 *                     "dateTime": "2023-11-01T09:00:00Z",
 *                     "location": "New York, NY",
 *                     "tags": ["web", "workshop"]
 *                   }
 *                 ],
 *                 "total": 2
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

export const getAllMeetups = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || undefined;
    const limit = Number(req.query.limit) || undefined;

    const sortField = req.query.sortField
      ? String(req.query.sortField)
      : undefined;
    const sortOrder = (req.query.sortOrder as SORT_ORDER) || SORT_ORDER.ASC;

    const searchField = req.query.searchField
      ? String(req.query.searchField)
      : undefined;
    const searchValue = req.query.searchValue
      ? String(req.query.searchValue)
      : undefined;

    const { statusCode, jsonResponse } = await meetupService.getAll({
      page,
      limit,
      sortField,
      sortOrder,
      searchField,
      searchValue,
    });

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    const errorMessage = errorHeplers.getMessageFromUnkownError(error);
    res
      .status(500)
      .json({ error: `Error in getAllMeetups controller: ${errorMessage}` });
  }
};
