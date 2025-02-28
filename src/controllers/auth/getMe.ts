import { User } from "@prisma/client";
import { refreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { userService } from "@services/user";
import { errorHeplers } from "@utils/errors/errorHelpers";
import { omitObjectKeys } from "@utils/omitObjectKeys";
import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  try {
    const requestUser = req.user as User;

    const { statusCode, jsonResponse } = await userService.getMe(requestUser);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      message: `Error in getMe controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
