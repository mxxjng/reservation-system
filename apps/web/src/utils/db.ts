import { AnyColumn, and, asc, desc, ilike } from "drizzle-orm";
import { PgSelect } from "drizzle-orm/pg-core";
import { OptionalQueryParams } from "~/types/zod";

/* Function to add optional query params to a query builder */
export function withQueryParams<T extends PgSelect>(
  qb: T,
  data: OptionalQueryParams,
  searchColumn: AnyColumn,
  orderColumn: AnyColumn | undefined
) {
  if (orderColumn) {
    return qb
      .where(and(data.search ? ilike(searchColumn, data.search) : undefined))
      .orderBy(data.order === "desc" ? desc(orderColumn) : asc(orderColumn))
      .limit(data.limit ?? 20)
      .offset(data.limit && data.page ? (data.page - 1) * data.limit : 0);
  }

  return qb
    .where(and(data.search ? ilike(searchColumn, data.search) : undefined))
    .limit(data.limit ?? 20)
    .offset(data.limit && data.page ? (data.page - 1) * data.limit : 0);
}

/* Function to generate order by condition */
export function generateOrderBy(
  orderColumn: AnyColumn | undefined,
  order: "asc" | "desc" | undefined
) {
  if (orderColumn && order) {
    return order === "desc" ? desc(orderColumn) : asc(orderColumn);
  }

  return undefined;
}

/* Function to generate the query offset */
export function generateOffset(limit: number, page: number) {
  return limit && page ? (page - 1) * limit : undefined;
}
