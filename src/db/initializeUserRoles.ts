import { userRoleRepository } from "@repositories/UserRoleRepository";
import { USER_ROLES } from "@utils/constants";

export const initializeUserRoles = async () => {
  await userRoleRepository.create({
    name: USER_ROLES.PARTICIPANT,
  });

  await userRoleRepository.create({
    name: USER_ROLES.ORGANIZER,
  });
};
