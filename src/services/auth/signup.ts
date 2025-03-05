import prismaClient from "@db/prismaClient";
import { userRepository } from "@repositories/UserRepository";
import { accessTokenService } from "@services/accessToken";
import { refreshTokenService } from "@services/refreshToken";
import { userRolesService } from "@services/userRoles";
import { SignupSchema } from "@utils/dto/user";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { passwordHelpers } from "@utils/passwordHelpers";

export const signup = async (
  validatedData: SignupSchema,
): Promise<ServiceResult> => {
  try {
    const existingUser = await userRepository.getByEmail(validatedData.email);

    if (existingUser) {
      return {
        statusCode: 400,
        jsonResponse: { error: "User with this email already exists" },
      };
    }

    const hashedPassword = await passwordHelpers.hashPassword(
      validatedData.password,
    );

    const roleRecord = await userRolesService.getRoleRecord(validatedData.role);
    if (!roleRecord) {
      return {
        statusCode: 400,
        jsonResponse: {
          error: "Role not found",
        },
      };
    }

    const transactionLogic = async () => {
      const user = await userRepository.create({
        ...validatedData,
        password: hashedPassword,
        roleId: roleRecord.id,
      });

      const { accessToken } = await accessTokenService.generateTokenAndSaveToDb(
        user.id,
      );
      const { refreshToken } =
        await refreshTokenService.generateTokenAndSaveToDb(user.id);

      return {
        statusCode: 201,
        jsonResponse: {
          user,
          accessToken,
          refreshToken,
        },
      };
    };

    return await prismaClient.$transaction(transactionLogic);
  } catch (error) {
    return {
      statusCode: 500,
      jsonResponse: {
        error: `Internal Server Error: ${errorHeplers.getMessageFromUnkownError(error)}`,
      },
    };
  }
};
