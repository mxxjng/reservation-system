import { UseGuards, applyDecorators } from '@nestjs/common';
import * as schema from '@/drizzle/schema';
import { PermissionDecorator } from './permission.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';

export function Permissions(permissions: schema.TPermissions[]) {
  return applyDecorators(
    PermissionDecorator(...permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
  );
}
