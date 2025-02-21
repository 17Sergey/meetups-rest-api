import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createMeetup,
  deleteMeetup,
  getAllMeetups,
  getMeetupById,
  updateMeetup,
} from "@controllers/meetupControllers";

const router = express.Router();

router.get("/", getAllMeetups);
router.get("/:id", getMeetupById);

router.post("/", protectRoute, createMeetup);

router.put("/:id", protectRoute, updateMeetup);
router.delete("/:id", protectRoute, deleteMeetup);

export default router;
