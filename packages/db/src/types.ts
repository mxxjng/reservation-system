import * as nodePostgres from "drizzle-orm/node-postgres";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as pgCore from "drizzle-orm/pg-core";

import * as schema from "./schema/schema";

export type TDatabase = nodePostgres.NodePgDatabase<typeof schema>;
export type TEntity = pgCore.PgTableWithColumns<any>;

/* Reservation DB Types */
export const insertReservationSchema = createInsertSchema(schema.reservations);
export const selectReservationSchema = createSelectSchema(schema.reservations);
export type TReservation = typeof schema.reservations.$inferSelect;
export type insertReservationSchema = typeof schema.reservations.$inferInsert;
