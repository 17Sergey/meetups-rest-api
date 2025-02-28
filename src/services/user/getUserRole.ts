import { User } from "@prisma/client";
import { userRoleRepository } from "@repositories/UserRoleRepository";

export const getUserRole = async (user: User) => {
  const role = await userRoleRepository.getById(user.roleId);

  if (!role) throw new Error("Role was not found");

  return role.name;
};
