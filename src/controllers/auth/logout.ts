import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  // TODO: удаление refreshToken из базы данных
  res.sendStatus(204);
};
