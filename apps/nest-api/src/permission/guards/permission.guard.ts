import { RoleService } from '@/role/service/role.service';
import { UserService } from '@/user/service/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as schema from '@/drizzle/schema';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirePermissions = this.reflector.getAllAndOverride<
      schema.TPermissions[]
    >('permissions', [context.getHandler(), context.getClass()]);

    if (!requirePermissions) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const userId = req?.user?.sub;

    if (!userId) {
      return false;
    }

    const user = await this.userService.findOneWithRole(userId);

    if (!user) {
      return false;
    }

    return await this.roleService.checkIfRoleHasRequiredPermissions(
      user.roleId,
      requirePermissions,
    );
  }
}
