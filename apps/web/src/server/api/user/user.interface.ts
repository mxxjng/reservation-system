import { InsertUserSchema, TUser } from "~/server/db/schema";
import { BaseInterfaceRepository } from "../interface/repository.interface";

export interface UserRepositoryInterface extends BaseInterfaceRepository<TUser, InsertUserSchema> {}
