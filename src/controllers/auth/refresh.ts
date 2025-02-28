import { Request, Response } from "express";
import { userService } from "@services/user";
import { errorHeplers } from "@utils/errors/errorHelpers";

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;

    const { statusCode, jsonResponse } =
      await userService.refresh(refreshToken);

    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in refresh controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
