import { TRPCError } from "@trpc/server";
import { inject, injectable } from "inversify";

import * as schema from "~/server/db/schema";
import { generateEntityLogTemplate } from "~/utils/logtemplates";
import { BaseServiceInterface } from "../interface/service.interface";
import { LogServiceNew } from "../service/log.service";
import { TYPES } from "../types";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService implements BaseServiceInterface<schema.TUser, schema.InsertUserSchema> {
  constructor(
    @inject(TYPES.UserRepository) private repository: UserRepository,
    @inject(TYPES.LogService) private logService: LogServiceNew
  ) {}

  /* Basic Create */
  async create(data: schema.InsertUserSchema, userId: string, userName: string) {
    const created = await this.repository.create(data);

    await this.logService.log(
      generateEntityLogTemplate("User", userName, `${created[0]?.username}` || "Unknown", "Create"),
      "Create",
      userId
    );

    return created;
  }

  /* Basic Update */
  async update(id: string, data: schema.InsertUserSchema, userId: string, userName: string) {
    try {
      const updated = await this.repository.update(id, data);

      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      await this.logService.log(
        generateEntityLogTemplate("User", userName, `${updated?.username}` || "Unknown", "Create"),
        "Update",
        userId
      );

      return updated;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not update User",
      });
    }
  }

  /* Basic Delete */
  async delete(id: string, userId: string, userName: string) {
    // NOTE: purpose of try catch blocks here is to catch any errors from the repositories and database and add a more specific error message insead of f.e violation of foreign key constraints
    try {
      // TODO: check if image string exists and then delete it from the bucket
      const deleted = await this.repository.delete(id);

      if (!deleted) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      await this.logService.log(
        generateEntityLogTemplate("User", userName, `${deleted?.name}` || "Unknown", "Delete"),
        "Delete",
        userId
      );

      return deleted;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not delete User",
      });
    }
  }

  /* Basic Find by id */
  async findOne(id: string) {
    return await this.repository.findOneById(id);
  }

  /* Basic Find all */
  async findAll() {
    return await this.repository.findAll();
  }

  /* Find all with Roles */
  async findAllWithRoles() {
    return await this.repository.findAllWithRoles();
  }

  /* Create with Roles */
  async createWithRoles(data: schema.InsertUserSchema, roleData: schema.InsertUserRolesSchema) {
    return await this.repository.createWithRoles(data, roleData);
  }
}
