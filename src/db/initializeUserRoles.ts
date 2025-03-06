import { userRoleRepository } from "@repositories/UserRoleRepository";

import { USER_ROLES } from "@services/userRoles/constants";

export const initializeUserRoles = async () => {
  const roles = await userRoleRepository.getAll();

  if (roles.length < 2) {
    await userRoleRepository.create({
      name: USER_ROLES.PARTICIPANT,
    });

    await userRoleRepository.create({
      name: USER_ROLES.ORGANIZER,
    });

    console.log(`[db]: User roles initialized`);
  }
};
