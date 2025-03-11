import { User } from "@prisma/client";
import { Request, Response } from "express";

import { userRolesService } from "@services/userRoles";

export const checkUserRole = async (
  req: Request,
  res: Response,
  next: VoidFunction,
) => {
  const user = req.user as User;

  const isOrganizer = await userRolesService.isOrganizer(user.roleId);

  if (!isOrganizer) {
    res.status(403).json({
      error:
        "Access denied. You do not have permission to perform this operation",
    });
    return;
  }

  next();
};
