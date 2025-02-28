import { z } from "zod";

export const createMeetupSchema = z.object({
  title: z
    .string()
    .max(100, { message: "Title must be at most 100 characters long." })
    .nonempty({ message: "Title is required." }),

  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long." })
    .nonempty({ message: "Description is required." }),

  dateTime: z
    .string()
    .nonempty({ message: "Date and time are required." })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format. Please use a valid ISO date format.",
    }),

  location: z
    .string()
    .max(200, { message: "Location must be at most 200 characters long." })
    .nonempty({ message: "Location is required." }),
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
});

export type CreateMeetupSchema = z.infer<typeof createMeetupSchema>;
export type UpdateMeetupSchema = z.infer<typeof updateMeetupSchema>;
