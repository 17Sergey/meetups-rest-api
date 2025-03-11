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
