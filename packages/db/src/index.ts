import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/* Enums */
export const weekDayEnum = pgEnum("weekday", [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

/* Reservation */
export const reservations = pgTable("reservation", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  email: text("email").notNull().unique(),
  firstname: text("first_name").notNull(),
  lastname: text("last_name").notNull(),
  reservationDate: timestamp("reservation_date").notNull(),
});

/* Reservation DB Types */
export const insertReservationSchema = createInsertSchema(reservations);
export const selectReservationSchema = createSelectSchema(reservations);
export type TReservation = typeof reservations.$inferSelect;
export type InsertReservationSchema = typeof reservations.$inferInsert;
