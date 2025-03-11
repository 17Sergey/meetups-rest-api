import z from "zod";

export const numericIdSchema = z.number().int().positive();
