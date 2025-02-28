import { Request, Response } from "express";
import { userService } from "@services/user";
import { errorHeplers } from "@utils/errors/errorHelpers";

export const signup = async (req: Request, res: Response) => {
  try {
    const { statusCode, jsonResponse } = await userService.signup(req.body);
    res.status(statusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error in signup controller: ${errorHeplers.getMessageFromUnkownError(error)}`,
    });
  }
};
