import { USER_ROLES } from "@services/userRoles/constants";
import z from "zod";

export const signupSchema = z.object({
  fullName: z
    .string({ message: "Full name is required" })
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name must be maximum 50 characters long." }),

  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address." }),

  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password must be maximum 20 characters long." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character.",
    }),

  role: z.enum([USER_ROLES.PARTICIPANT, USER_ROLES.ORGANIZER], {
    message:
      "Role is required and must be either 'participant' or 'organizer'.",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address." })
    .refine((value) => Boolean(value), {
      message: "Email is required.",
    }),

  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long." })
    .refine((value) => Boolean(value), {
      message: "Password is required.",
    }),
});

export const refreshSchema = z.object({
  refreshToken: z.string({ message: "Refresh token is required" }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RefreshSchema = z.infer<typeof refreshSchema>;
