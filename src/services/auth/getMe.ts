import { User } from "@prisma/client";

import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";

import { omitObjectKeys } from "@utils/omitObjectKeys";

import { userService } from ".";

export const getMe = async (requestUser: User): Promise<ServiceResult> => {
  const userRole = await userService.getUserRole(requestUser);
  const user = omitObjectKeys(requestUser, ["password", "roleId"]);
  const refreshToken = await refreshTokenRepository.getByUserId(user.id);

  return {
    statusCode: 200,
    jsonResponse: {
      ...user,
      role: userRole,
      refreshToken: refreshToken?.refreshToken,
    },
  };
};
