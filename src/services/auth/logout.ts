import { accessTokenRepository } from "@repositories/AccessTokenRepository";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";

import { errorHeplers } from "@utils/errors/errorHelpers";

export const logout = async (userId: number): Promise<ServiceResult> => {
  try {
    const storedRefreshToken = await refreshTokenRepository.getByUserId(userId);
    if (!storedRefreshToken) {
      return {
        statusCode: 400,
        jsonResponse: { message: "Logout failed: user already logged out" },
      };
    }

    await accessTokenRepository.deleteByUserId(userId);
    await refreshTokenRepository.deleteByUserId(userId);

    return {
      statusCode: 200,
      jsonResponse: { message: "Logout successful" },
    };
  } catch (error) {
    return {
      statusCode: 500,
      jsonResponse: {
        error: `Internal Server Error: ${errorHeplers.getMessageFromUnkownError(error)}`,
      },
    };
  }
};
