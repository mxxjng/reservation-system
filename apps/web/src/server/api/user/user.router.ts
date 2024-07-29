import { z } from "zod";

import { userService } from "~/server/api/inversify.config";
import { insertUserRolesSchema, insertUserSchema } from "~/server/db/schema";
import { catchProcedure, createTRPCRouter } from "../trpc";

const userIdSchema = z.string().uuid("User not found");

export const userRouter = createTRPCRouter({
  /* Create a User */
  create: catchProcedure.input(insertUserSchema).mutation(async ({ input, ctx }) => {
    const { id, name } = ctx.session?.user;
    return await userService.create(input, id, name || "Unkown User");
  }),

  /* Update a User */
  update: catchProcedure
    .input(
      insertUserSchema.extend({
        id: userIdSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name } = ctx.session?.user;
      return await userService.update(input.id, input, id, name || "Unkown User");
    }),

  /* Delete a User */
  delete: catchProcedure.input(userIdSchema).mutation(async ({ input, ctx }) => {
    const { id, name } = ctx.session?.user;
    return await userService.delete(input, id, name || "Unkown User");
  }),

  /* Find a User */
  findOne: catchProcedure.input(userIdSchema).query(async ({ input }) => {
    return await userService.findOne(input);
  }),

  /* Find All */
  findAll: catchProcedure.query(async () => {
    return await userService.findAll();
  }),

  /* Find All with roles */
  findAllWithRoles: catchProcedure.query(async () => {
    return await userService.findAllWithRoles();
  }),

  /* Create with Roles */
  createWithRoles: catchProcedure
    .input(
      z.object({
        user: insertUserSchema,
        role: insertUserRolesSchema,
      })
    )
    .mutation(async ({ input }) => {
      return await userService.createWithRoles(input.user, input.role);
    }),
});
