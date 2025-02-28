import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { errorHeplers } from "@utils/errors/errorHelpers";

export const logout = async (userId: number): Promise<ServiceResult> => {
  try {
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
