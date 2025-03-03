import { User } from "@prisma/client";
import { userService } from ".";
import { omitObjectKeys } from "@utils/omitObjectKeys";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";

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
