import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getAllMeetups } from "@controllers/meetup/getAllMeetups";
import { getMeetupById } from "@controllers/meetup/getMeetupById";
import { createMeetup } from "@controllers/meetup/createMeetup";
import { updateMeetup } from "@controllers/meetup/updateMeetup";
import { deleteMeetup } from "@controllers/meetup/deleteMeetup";
import { validateIdParameter } from "@middleware/validateIdParameter.js";
import { numericIdSchema } from "@utils/dto/numericId.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meetups
 *   description: API for managing meetups
 */

router.get("/", getAllMeetups);
router.get("/:id", validateIdParameter(numericIdSchema), getMeetupById);

router.post("/", protectRoute, createMeetup);

router.put(
  "/:id",
  protectRoute,
  validateIdParameter(numericIdSchema),
  updateMeetup,
);

router.delete(
  "/:id",
  protectRoute,
  validateIdParameter(numericIdSchema),
  deleteMeetup,
);

export default router;
