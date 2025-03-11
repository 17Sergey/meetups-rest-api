import { Request, Response } from "express";

import { errorHeplers } from "@utils/errors/errorHelpers";

export const validateCookieItem = (key: string) => {
  return (req: Request, res: Response, next: any) => {
    try {
      const item = req.cookies[key];

      if (!item) {
        res.status(403).json({
          error: `No cookie for ${key} was found`,
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        error: `Error occurred: ${errorHeplers.getMessageFromUnkownError(error)}`,
      });
    }
  };
};
