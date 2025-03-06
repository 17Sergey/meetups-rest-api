import express from "express";

import { getAllMeetups } from "@controllers/meetup/getAllMeetups";
import { getMeetupById } from "@controllers/meetup/getMeetupById";
import { createMeetup } from "@controllers/meetup/createMeetup";
import { updateMeetup } from "@controllers/meetup/updateMeetup";
import { deleteMeetup } from "@controllers/meetup/deleteMeetup";

import { validateIdParameter } from "@middleware/validateIdParameter";
import { validateSchema } from "@middleware/validateSchema";
import { checkUserRole } from "@middleware/checkUserRole";
import { validateQueryParams } from "@middleware/validateQueryParams";

import { createMeetupSchema, updateMeetupSchema } from "@utils/dto/meetup";
import { numericIdSchema } from "@utils/dto/numericId";
import { getAllQueryParamsSchema } from "@utils/dto/getAllQueryParams";

import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meetups
 *   description: API for managing meetups
 */

/**
 * @swagger
 * /meetups:
 *   post:
 *     summary: Create a new meetup
 *     tags: [Meetups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       201:
 *         description: Meetup created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *       403:
 *         description: Access denied
 *
 * /meetups/{id}:
 *   put:
 *     summary: Update an existing meetup
 *     tags: [Meetups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meetup
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       200:
 *         description: Meetup updated successfully
 *       403:
 *         description: Access denied
 *
 *   delete:
 *     summary: Delete a meetup
 *     tags: [Meetups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meetup
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Meetup deleted successfully
 *       404:
 *         description: Meetup not found
 *       403:
 *         description: Access denied
 */

router.get("/", validateQueryParams(getAllQueryParamsSchema), getAllMeetups);
router.get("/:id", validateIdParameter(numericIdSchema), getMeetupById);

router.post(
  "/",
  protectRoute,
  validateSchema(createMeetupSchema),
  checkUserRole,
  createMeetup,
);

router.put(
  "/:id",
  protectRoute,
  validateIdParameter(numericIdSchema),
  validateSchema(updateMeetupSchema),
  checkUserRole,
  updateMeetup,
);

router.delete(
  "/:id",
  protectRoute,
  validateIdParameter(numericIdSchema),
  checkUserRole,
  deleteMeetup,
);

export default router;
