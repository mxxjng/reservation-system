import { InsertUser, TUser } from '@/drizzle/schema';
import { BaseInterfaceRepository } from '@/repositories/repository.interface';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<TUser, InsertUser> {}
