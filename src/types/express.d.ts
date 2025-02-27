import { User } from "@prisma/client";

declare namespace Express {
  export interface Request {
    id?: number;
    user?: User;
  }
}
