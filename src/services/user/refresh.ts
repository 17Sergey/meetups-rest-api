import prismaClient from "@db/prismaClient";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { generateAccessToken } from "@utils/jwt";

export const refresh = async (refreshToken: string): Promise<ServiceResult> => {
  const storedToken = await refreshTokenRepository.getByToken(refreshToken);

  if (!storedToken) {
    return {
      statusCode: 403,
      jsonResponse: { error: "Invalid refresh token" },
    };
  }

  try {
    const transactionLogic = async () => {
      if (new Date() > new Date(storedToken.expiresAt)) {
        await refreshTokenRepository.delete(storedToken.id);
        return {
          statusCode: 403,
          jsonResponse: { error: "Refresh token has expired" },
        };
      }

      const newAccessToken = generateAccessToken(storedToken.userId);

      return {
        statusCode: 200,
        jsonResponse: { accessToken: newAccessToken },
      };
    };

    return await prismaClient.$transaction(transactionLogic);
  } catch (error) {
    return {
      statusCode: 500,
      jsonResponse: {
        error: `Error in refresh service: ${errorHeplers.getMessageFromUnkownError(error)}`,
      },
    };
  }
};
