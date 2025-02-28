import prismaClient from "@db/prismaClient";
import { UserRole } from "@prisma/client";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { userRepository } from "@repositories/UserRepository";
import { userRoleRepository } from "@repositories/UserRoleRepository";
import { refreshTokenService } from "@services/refreshToken";
import { LoginSchema } from "@utils/dto/user";
import { generateAccessToken } from "@utils/jwt";
import { omitObjectKeys } from "@utils/omitObjectKeys";
import { passwordHelpers } from "@utils/passwordHelpers";

export const login = async ({
  email,
  password,
}: LoginSchema): Promise<ServiceResult> => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    return {
      statusCode: 400,
      jsonResponse: {
        error: "User with this email not found",
      },
    };
  }

  const isPasswordsMatch = await passwordHelpers.comparePassword(
    password,
    user.password,
  );
  if (!isPasswordsMatch) {
    return {
      statusCode: 403,
      jsonResponse: {
        error: "Invalid credentials",
      },
    };
  }

  const transactionLogic = async () => {
    const accessToken = generateAccessToken(user.id);

    let refreshToken = "";
    let refreshRecord = await refreshTokenRepository.getByUserId(user.id);

    if (!refreshRecord) {
      const { refreshToken: newRefreshToken } =
        await refreshTokenService.generateTokenAndSaveToDb(user.id);

      refreshToken = newRefreshToken;
    } else {
      refreshToken = refreshRecord.refreshToken;
    }

    const userToPass = omitObjectKeys(user, ["password", "roleId"]);
    const role = (await userRoleRepository.getById(user.roleId)) as UserRole;

    return {
      statusCode: 200,
      jsonResponse: {
        user: {
          ...userToPass,
          role: role.name,
        },
        accessToken,
        refreshToken,
      },
    };
  };

  return await prismaClient.$transaction(transactionLogic);
};
