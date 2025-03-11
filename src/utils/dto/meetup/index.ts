import { z } from "zod";

export const createMeetupSchema = z.object({
  title: z
    .string({ message: "Title is required." })
    .max(100, { message: "Title must be at most 100 characters long." }),

  description: z
    .string({ message: "Description is required." })
    .max(500, { message: "Description must be at most 500 characters long." }),

  dateTime: z
    .string({ message: "Datetime is required." })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format. Please use a valid ISO date format.",
    }),

  location: z
    .string({ message: "Location is required." })
    .max(200, { message: "Location must be at most 200 characters long." }),

  tags: z.array(z.string()).optional(),
});

export const updateMeetupSchema = z.object({
  title: z
    .string()
    .max(100, { message: "Title must be at most 100 characters long." })
    .nonempty({ message: "Title cannot be an empty string." })
    .optional(),

  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long." })
    .nonempty({ message: "Description cannot be an empty string." })
    .optional(),

  dateTime: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format. Please use a valid ISO date format.",
    })
    .optional(),

  location: z
    .string()
    .max(200, { message: "Location must be at most 200 characters long." })
    .nonempty({ message: "Location cannot be an empty string." })
    .optional(),

  tags: z.array(z.string()).optional(),
});

export type CreateMeetupSchema = z.infer<typeof createMeetupSchema>;
export type UpdateMeetupSchema = z.infer<typeof updateMeetupSchema>;
