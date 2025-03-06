import { Request, Response } from "express";
import z from "zod";

import { errorHeplers } from "@utils/errors/errorHelpers";

export const validateQueryParams = (schema: any) => {
  return (req: Request, res: Response, next: any) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);

        res.status(400).json({
          error: `Error validating query params: ${errorMessages.join(", ")}`,
        });
      } else {
        res.status(500).json({
          error: `Error occurred: ${errorHeplers.getMessageFromUnkownError(error)}`,
        });
      }
    }
  };
};
