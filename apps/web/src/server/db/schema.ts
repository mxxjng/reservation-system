import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("user", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  username: varchar("username", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  favoriteTeamId: uuid("favoriteTeamId"),
});
export const usersRelations = relations(users, ({ many, one }) => ({
  activities: many(logs),
}));

export const logTypeEnum = pgEnum("log_type", ["Auth", "Create", "Update", "Delete"]);

export const logs = pgTable("log", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  message: varchar("message", { length: 255 }).notNull(),
  type: logTypeEnum("type").notNull(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
});
export const logsRelations = relations(logs, ({ one }) => ({
  user: one(users, {
    fields: [logs.userId],
    references: [users.id],
  }),
}));

export const roleTypeEnum = pgEnum("role_type", ["ADMIN", "USER", "CATCH_EDITOR", "TEAM_EDITOR"]);

export const roles = pgTable("role", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  type: roleTypeEnum("type").notNull(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  createdById: uuid("createdById")
    .references(() => users.id)
    .notNull(),
  updatedById: uuid("updatedById")
    .references(() => users.id)
    .notNull(),
});
export const rolesRelations = relations(roles, ({ one, many }) => ({
  rolePermissions: many(rolePermissions),
  created_by: one(users, {
    fields: [roles.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updated_by: one(users, {
    fields: [roles.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));

export const permissions = pgTable("permission", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  createdById: uuid("createdById")
    .references(() => users.id)
    .notNull(),
  updatedById: uuid("updatedById")
    .references(() => users.id)
    .notNull(),
});
export const permissionsRelations = relations(permissions, ({ one }) => ({
  created_by: one(users, {
    fields: [permissions.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updated_by: one(users, {
    fields: [permissions.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));

export const rolePermissions = pgTable("role_permission", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  permissionId: uuid("permissionId")
    .references(() => permissions.id)
    .notNull(),
  roleId: uuid("roleId")
    .references(() => roles.id)
    .notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  createdById: uuid("createdById")
    .references(() => users.id)
    .notNull(),
  updatedById: uuid("updatedById")
    .references(() => users.id)
    .notNull(),
});
export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
  created_by: one(users, {
    fields: [rolePermissions.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updated_by: one(users, {
    fields: [rolePermissions.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));

export const userRoles = pgTable("user_role", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" }) // also deletes user role once user is deleted
    .notNull(),
  roleId: uuid("roleId")
    .references(() => roles.id)
    .notNull(),
});
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

/* Base Image Object schema for every image upload */
export const imageObjectSchema = z.object({
  imageBase64: z.string(),
  imagePath: z.string(),
});
export type ImageObjectSchema = z.infer<typeof imageObjectSchema>;

// User Types
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type TUser = typeof users.$inferSelect;
export type UserSchema = z.infer<typeof insertUserSchema>;
export type InsertUserSchema = typeof users.$inferInsert;

// Log Types
export const insertLogSchema = createInsertSchema(logs);
export const selectLogSchema = createSelectSchema(logs);
export type TLog = typeof logs.$inferSelect;
export type LogSchema = z.infer<typeof insertLogSchema>;
export type InsertLogSchema = typeof logs.$inferInsert;

// User Roles Types
export const insertUserRolesSchema = createInsertSchema(userRoles);
export const selectUserRolesSchema = createSelectSchema(userRoles);
export type TUserRoles = typeof userRoles.$inferSelect;
export type UserRolesSchema = z.infer<typeof insertUserRolesSchema>;
export type InsertUserRolesSchema = typeof userRoles.$inferInsert;

// Role Types
export const insertRoleSchema = createInsertSchema(roles);
export const selectRoleSchema = createSelectSchema(roles);
export type TRole = typeof roles.$inferSelect;
export type RoleSchema = z.infer<typeof insertRoleSchema>;
export type InsertRoleSchema = typeof roles.$inferInsert;
