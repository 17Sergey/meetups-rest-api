import { userRoleRepository } from "@repositories/UserRoleRepository";
import { initializeUserRoles } from "./initializeUserRoles";

export const initializeDb = async () => {
  const roles = await userRoleRepository.getAll();

  if (roles.length < 2) {
    await initializeUserRoles();
    console.log(`[db]: User roles initialized`);
  }
};
