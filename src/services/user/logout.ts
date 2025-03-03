import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { errorHeplers } from "@utils/errors/errorHelpers";

export const logout = async (userId: number): Promise<ServiceResult> => {
  try {
    const storedToken = await refreshTokenRepository.getByUserId(userId);
    if (!storedToken) {
      return {
        statusCode: 400,
        jsonResponse: { message: "Logout failed: user already logged out" },
      };
    }

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
