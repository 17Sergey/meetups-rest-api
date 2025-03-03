import { Request, Response } from "express";
import { userService } from "@services/auth";
import { errorHeplers } from "@utils/errors/errorHelpers";

export const login = async (req: Request, res: Response) => {
  try {
    const { statusCode, jsonResponse } = await userService.login(req.body);
    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in login controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
