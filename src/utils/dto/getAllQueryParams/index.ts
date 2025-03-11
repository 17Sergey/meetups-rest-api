import { z } from "zod";

const SORT_ORDER_VALUES = ["asc", "desc"] as const;
const VALID_FIELDS = ["title", "description", "location", "dateTime"] as const;

export const getAllQueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1))
    .refine((val) => val >= 1, {
      message: "Page should be a number greater than or equal to 1",
    })
    .default("1"),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 5))
    .refine((val) => val >= 1, {
      message: "Limit should be a number greater than or equal to 1",
    })
    .default("5"),
  sortField: z.enum(VALID_FIELDS).default(VALID_FIELDS[0]).optional(),
  sortOrder: z.enum(SORT_ORDER_VALUES).default(SORT_ORDER_VALUES[0]).optional(),
  searchField: z.enum(VALID_FIELDS).default(VALID_FIELDS[0]).optional(),
  searchValue: z.string().optional(),
});
