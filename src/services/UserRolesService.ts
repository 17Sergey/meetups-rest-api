import { UserRole } from "@prisma/client";
import { userRoleRepository } from "@repositories/UserRoleRepository";
import { USER_ROLES } from "@utils/constants";

class UserRolesService {
  async getRole(roleName: string) {
    const allRoles = await userRoleRepository.getAll();

    const role = allRoles.find(({ name }) => name === roleName);

    return role as UserRole;
  }

  async getParticipantRole() {
    return this.getRole(USER_ROLES.PARTICIPANT);
  }

  async getOrganizerRole() {
    return this.getRole(USER_ROLES.ORGANIZER);
  }

  async isOrganizer(roleId: number) {
    const role = (await userRoleRepository.getById(roleId)) as UserRole;
    return role.name === USER_ROLES.ORGANIZER;
  }
}

export const userRolesService = new UserRolesService();
