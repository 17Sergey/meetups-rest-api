import { z } from "zod";

export const createMeetupSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  dateTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  location: z.string().max(200),
});

export const updateMeetupSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  dateTime: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  location: z.string().max(200).optional(),
});

export type CreateMeetupSchema = z.infer<typeof createMeetupSchema>;
export type UpdateMeetupSchema = z.infer<typeof updateMeetupSchema>;
