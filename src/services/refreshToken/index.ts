import { RefreshToken } from "@prisma/client";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { generateRefreshToken } from "@utils/jwt";

export const refreshTokenService = {
  async generateTokenAndSaveToDb(userId: number) {
    const { refreshToken, createdAt, expiresAt } = generateRefreshToken(userId);

    const refreshTokenRecord = await refreshTokenRepository.create({
      userId,
      refreshToken,
      createdAt,
      expiresAt,
    });

    return refreshTokenRecord;
  },

  checkTokenExpiration(expiresAt: RefreshToken["expiresAt"]) {
    return new Date() > new Date(expiresAt);
  },

  async getStoredOrCreateNewToken(userId: number) {
    const refreshRecord = await refreshTokenRepository.getByUserId(userId);

    if (!refreshRecord) {
      return await this.generateTokenAndSaveToDb(userId);
    }

    const isExpired = refreshTokenService.checkTokenExpiration(
      refreshRecord.expiresAt,
    );
    if (isExpired) {
      await refreshTokenRepository.deleteByUserId(userId);
      return await refreshTokenService.generateTokenAndSaveToDb(userId);
    }

    return refreshRecord;
  },
};
