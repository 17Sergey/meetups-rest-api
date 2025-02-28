import z from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name must be maximum 50 characters long." }),

  email: z.string().email({ message: "Invalid email address." }),

  password: z
    .string()
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
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const refreshSchema = z.object({
  refreshToken: z.string(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
