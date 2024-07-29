import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import * as nodePostgres from "drizzle-orm/node-postgres";
import { inject, injectable } from "inversify";

import { BaseAbstractRepository } from "~/server/api/repository/base.abstract.repository";
import { TYPES } from "~/server/api/types";
import * as schema from "~/server/db/schema";
import { UserRepositoryInterface } from "./user.interface";

@injectable()
export class UserRepository
  extends BaseAbstractRepository<schema.TUser, schema.InsertUserSchema>
  implements UserRepositoryInterface
{
  constructor(
    @inject(TYPES.Database)
    private readonly db: nodePostgres.NodePgDatabase<typeof schema>
  ) {
    super(db, schema.users);
  }

  async findOneWithJoins(userId: string) {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });
  }

  async findAllWithRoles() {
    return await this.db.query.userRoles.findMany({
      with: {
        user: true,
        role: true,
      },
    });
  }

  async createWithRoles(userData: schema.InsertUserSchema, roleData: schema.InsertUserRolesSchema) {
    const [createdUser] = await this.db.insert(schema.users).values(userData).returning();

    if (!createdUser) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    const createdRole = await this.db.insert(schema.userRoles).values({
      ...roleData,
      userId: createdUser.id,
    });

    return {
      user: createdUser,
      role: createdRole,
    };
  }

  async inviteUser() {}
}
