import express from "express";
import { protectRoute } from "@middleware/protectRoute";
import { getMe } from "@controllers/auth/getMe";
import { signup } from "@controllers/auth/signup";
import { login } from "@controllers/auth/login";
import { logout } from "@controllers/auth/logout";
import { validateSchema } from "@middleware/validateSchema";
import { loginSchema, refreshSchema, signupSchema } from "@utils/dto/user";
import { refresh } from "@controllers/auth/refresh";

export const AUTH_ROUTES = {
  ME: "/me",
  REFRESH: "/refresh",
  SIGNUP: "/signup",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

const router = express.Router();

router.get(AUTH_ROUTES.ME, protectRoute, getMe);

router.post(AUTH_ROUTES.REFRESH, validateSchema(refreshSchema), refresh);

router.post(AUTH_ROUTES.SIGNUP, validateSchema(signupSchema), signup);

router.post(AUTH_ROUTES.LOGIN, validateSchema(loginSchema), login);

router.post(AUTH_ROUTES.LOGOUT, protectRoute, logout);

export default router;
