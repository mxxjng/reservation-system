import { InsertRole, TRole } from '@/drizzle/schema';
import { BaseInterfaceRepository } from '@/repositories/repository.interface';

export interface RoleRepositoryInterface
  extends BaseInterfaceRepository<TRole, InsertRole> {}
