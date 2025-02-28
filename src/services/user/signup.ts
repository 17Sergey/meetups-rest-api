import prismaClient from "@db/prismaClient";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { userRepository } from "@repositories/UserRepository";
import { refreshTokenService } from "@services/refreshToken";
import { userRolesService } from "@services/UserRolesService";
import { SignupSchema } from "@utils/dto/user";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { generateAccessToken, generateRefreshToken } from "@utils/jwt";
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
    const participantRole = await userRolesService.getParticipantRole();

    const transactionLogic = async () => {
      const user = await userRepository.create({
        ...validatedData,
        password: hashedPassword,
        roleId: participantRole.id,
      });

      const accessToken = generateAccessToken(user.id);
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
