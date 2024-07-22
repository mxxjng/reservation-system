import { SetMetadata } from '@nestjs/common';
import * as schema from '@/drizzle/schema';

export const PermissionDecorator = (...permissions: schema.TPermissions[]) =>
  SetMetadata('permissions', permissions);
