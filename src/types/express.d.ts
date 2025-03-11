declare namespace Express {
  export interface Request {
    id?: number;
    user?: {
      id: number;
      fullName: string;
      email: string;
      password: string;
      roleId: number;
    };
  }
}
