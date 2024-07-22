import { Injectable } from '@nestjs/common';

import * as schema from '@/drizzle/schema';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  /* Check if role has all required permissions */
  async checkIfRoleHasRequiredPermissions(
    roleId: string,
    requiredPermissions: schema.TPermissions[],
  ) {
    const permissions =
      await this.roleRepository.getPermissionsFromRole(roleId);

    for (const permission of requiredPermissions) {
      if (!permissions.some((p) => p.permission.permission === permission)) {
        return false;
      }
    }

    return true;
  }
}
