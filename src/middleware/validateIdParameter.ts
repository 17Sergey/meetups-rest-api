import { errorHeplers } from "@utils/errors/errorHelpers";
import { Request, Response } from "express";
import z from "zod";

export const validateIdParameter = (schema: any) => {
  return (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    const idNumber = Number(id);

    try {
      schema.parse(idNumber);

      req.id = idNumber;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: `Error validating id parameter: ${error.errors[0].message}`,
        });
      } else {
        res.status(500).json({
          error: `Error validating id parameter: ${errorHeplers.getMessageFromUnkownError(error)}`,
        });
      }
    }
  };
};
