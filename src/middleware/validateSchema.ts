import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";
import z from "zod";

export const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);

        res.status(400).json({
          error: `Error validating request body: ${errorMessages.join(", ")}`,
        });
      } else {
        res.status(500).json({
          error: `Error occurred: ${errorHeplers.getMessageFromUnkownError(error)}`,
        });
      }
    }
  };
};
