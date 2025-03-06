import { UserRole } from "@prisma/client";

import { userRoleRepository } from "@repositories/UserRoleRepository";

import { USER_ROLES } from "@services/userRoles/constants";

class UserRolesService {
  async getRoleRecord(roleName: string) {
    return await userRoleRepository.getByName(roleName);
  }

  async isOrganizer(roleId: number) {
    const role = (await userRoleRepository.getById(roleId)) as UserRole;
    return role.name === USER_ROLES.ORGANIZER;
  }
}

export const userRolesService = new UserRolesService();
