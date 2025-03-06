import { User } from "@prisma/client";

import { accessTokenRepository } from "@repositories/AccessTokenRepository";

import { generateAccessToken } from "@utils/jwt";

export type VerifyTokenResponse = {
  isVerified: boolean;
  user?: User;
  statusCode?: number;
  jsonResponse?: object;
};

export const accessTokenService = {
  async generateTokenAndSaveToDb(userId: number) {
    const { accessToken, createdAt, expiresAt } = generateAccessToken(userId);

    await accessTokenRepository.create({
      userId,
      accessToken,
      createdAt,
      expiresAt,
    });

    return { accessToken };
  },

  async deleteOldAndGenerateNewToken(userId: number) {
    const storedToken = await accessTokenRepository.getByUserId(userId);

    if (storedToken) {
      await accessTokenRepository.deleteByUserId(userId);
    }

    return await this.generateTokenAndSaveToDb(userId);
  },
};
