import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

/* Enums */
export const weekDayEnum = pgEnum('weekday', [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]);

/* User */
export const users = pgTable('user', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  email: text('email').notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstname: text('first_name').notNull(),
  lastname: text('last_name').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  resetToken: text('reset_token'),
  resetExpire: integer('reset_expire'),
  roleId: uuid('role_id')
    .references(() => roles.id)
    .notNull(),
});
export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

/* Reservation */
export const reservations = pgTable('reservation', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  email: text('email').notNull().unique(),
  firstname: text('first_name').notNull(),
  lastname: text('last_name').notNull(),
  reservationDate: date('reservation_date').notNull(),
});

/* Roles */
export const roles = pgTable('role', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text('name').notNull(),
  description: text('description'),
  level: integer('level').notNull(),
});
export const rolesRelations = relations(roles, ({ many }) => ({
  permissions: many(permissions),
  users: many(users),
}));

export const permissionEnum = pgEnum('permissions_enum', [
  'read:reservation',
  'update:reservation',
  'delete:reservation',
  'create:reservation',
  '*',
]);

/* Permissions */
export const permissions = pgTable('permission', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text('name').notNull(),
  permission: permissionEnum('permission').notNull(),
  description: text('description'),
});

export const rolePermissions = pgTable('role_permissions', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  roleId: uuid('role_id')
    .references(() => roles.id)
    .notNull(),
  permissionId: uuid('permission_id')
    .references(() => permissions.id)
    .notNull(),
});
export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

/* User DB Types */
export const insertUser = createInsertSchema(users);
export const selectUser = createSelectSchema(users);
export type TUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/* Reservation DB Types */
export const insertReservationSchema = createInsertSchema(reservations);
export const selectReservationSchema = createSelectSchema(reservations);
export type TReservation = typeof reservations.$inferSelect;
export type InsertReservationSchema = typeof reservations.$inferInsert;

/* Roles DB Types */
export const insertRole = createInsertSchema(roles);
export const selectRole = createSelectSchema(roles);
export type TRole = typeof roles.$inferSelect;
export type InsertRole = typeof roles.$inferInsert;

/* Permissions DB Types */
export const insertPermission = createInsertSchema(permissions);
export const selectPermission = createSelectSchema(permissions);
export type TPermission = typeof permissions.$inferSelect;
export type InsertPermission = typeof permissions.$inferInsert;

/* Role Permissions DB Types */
export const insertRolePermission = createInsertSchema(rolePermissions);
export const selectRolePermission = createSelectSchema(rolePermissions);
export type TRolePermission = typeof rolePermissions.$inferSelect;
export type InsertRolePermission = typeof rolePermissions.$inferInsert;

/* System Permissions Enum Types */
export const permissionsEnumSchema = z.enum(permissionEnum.enumValues);
export type TPermissions = z.infer<typeof permissionsEnumSchema>;
