import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { getMe } from "@controllers/auth/getMe";
import { signup } from "@controllers/auth/signup";
import { login } from "@controllers/auth/login";
import { logout } from "@controllers/auth/logout";

export const AUTH_ROUTES = {
  ME: "/me",
  SIGNUP: "/signup",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

const router = express.Router();

router.get(AUTH_ROUTES.ME, protectRoute, getMe);

router.post(AUTH_ROUTES.SIGNUP, signup);

router.post(AUTH_ROUTES.LOGIN, login);

router.post(AUTH_ROUTES.LOGOUT, logout);

export default router;
