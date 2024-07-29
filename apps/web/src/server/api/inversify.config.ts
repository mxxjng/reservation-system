import { Container } from "inversify";
import "reflect-metadata";
import { db } from "~/server/db";

import { TYPES } from "./types";
import { ImageService } from "./service/image.service";
import { LogRepositoryNew } from "./repository/log.repository";
import { LogServiceNew } from "./service/log.service";
import { UserRepository } from "./user/user.repository";
import { UserService } from "./user/user.service";

const container = new Container();

container.bind(TYPES.Database).toConstantValue(db);

/* Binding Image Service */
container.bind(TYPES.ImageService).to(ImageService).inSingletonScope();

/* Binding Log classes */
container.bind(TYPES.LogRepository).to(LogRepositoryNew).inSingletonScope();
container.bind(TYPES.LogService).to(LogServiceNew).inSingletonScope();

/* Binding User classes */
container.bind(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind(TYPES.UserService).to(UserService).inSingletonScope();

/* Initilaize all services and expose them */
export const userService = container.get<UserService>(TYPES.UserService);
