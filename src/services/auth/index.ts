import { login } from "./login";
import { signup } from "./signup";
import { getUserRole } from "./getUserRole";
import { refresh } from "./refresh";
import { logout } from "./logout";
import { getMe } from "./getMe";

export const userService = {
  getMe,
  signup,
  login,
  logout,
  refresh,
  getUserRole,
};
