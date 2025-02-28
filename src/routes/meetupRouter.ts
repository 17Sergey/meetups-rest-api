import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getAllMeetups } from "@controllers/meetup/getAllMeetups";
import { getMeetupById } from "@controllers/meetup/getMeetupById";
import { createMeetup } from "@controllers/meetup/createMeetup";
import { updateMeetup } from "@controllers/meetup/updateMeetup";
import { deleteMeetup } from "@controllers/meetup/deleteMeetup";
import { validateIdParameter } from "@middleware/validateIdParameter";
import { numericIdSchema } from "@utils/dto/numericId";
import { validateSchema } from "@middleware/validateSchema";
import {
  createMeetupSchema,
  updateMeetupSchema,
} from "@utils/dto/meetup/index.js";
import { checkUserRole } from "@middleware/checkUserRole";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meetups
 *   description: API for managing meetups
 */

router.get("/", getAllMeetups);
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
