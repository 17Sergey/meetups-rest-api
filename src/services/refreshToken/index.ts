import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { generateRefreshToken } from "@utils/jwt";

export const refreshTokenService = {
  async generateTokenAndSaveToDb(userId: number) {
    const { refreshToken, createdAt, expiresAt } = generateRefreshToken(userId);

    await refreshTokenRepository.create({
      userId,
      refreshToken,
      createdAt,
      expiresAt,
    });

    return { refreshToken };
  },

  async getStoredOrCreateNewToken(userId: number) {
    const refreshRecord = await refreshTokenRepository.getByUserId(userId);

    if (refreshRecord) return refreshRecord;

    return await this.generateTokenAndSaveToDb(userId);
  },
};
