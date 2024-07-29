import { z } from "zod";

// TODO: maybe add schema for every entity to have typesafe filter for queries
/* Optional basic query params for findall trcp queries */
export const optionalQueryParamsSchema = z.object({
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).optional(),
  page: z.number().int().min(0).optional(),
  orderBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type OptionalQueryParams = z.infer<typeof optionalQueryParamsSchema>;
