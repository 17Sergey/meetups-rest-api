import prismaClient from "@db/prismaClient";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { accessTokenService } from "@services/accessToken";
import { errorHeplers } from "@utils/errors/errorHelpers";

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

      const newAccessToken =
        await accessTokenService.deleteOldAndGenerateNewToken(
          storedToken.userId,
        );

      return {
        statusCode: 200,
        jsonResponse: { accessToken: newAccessToken.accessToken },
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
