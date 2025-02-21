import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", protectRoute, createUser);
router.put("/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, deleteUser);

export default router;
