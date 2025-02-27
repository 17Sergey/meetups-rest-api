import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { getAllUsers } from "@controllers/user/getAllUsers";
import { createUser } from "@controllers/user/createUser";
import { updateUser } from "@controllers/user/updateUser";
import { deleteUser } from "@controllers/user/deleteUser";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", protectRoute, createUser);
router.put("/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, deleteUser);

export default router;
