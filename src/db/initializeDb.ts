import { initializeUserRoles } from "./initializeUserRoles";
import { initializeAdminUser } from "./initializeAdminUser";

export const initializeDb = async () => {
  await initializeUserRoles();
  await initializeAdminUser();
};
