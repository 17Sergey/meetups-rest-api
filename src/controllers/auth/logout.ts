import { User } from "@prisma/client";
import { Request, Response } from "express";

import { userService } from "@services/auth";

import { errorHeplers } from "@utils/errors/errorHelpers";

export const logout = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const { statusCode, jsonResponse } = await userService.logout(id);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in logout controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
