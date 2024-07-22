import { Inject, Injectable } from '@nestjs/common';
import * as nodePostgres from 'drizzle-orm/node-postgres';

import { PG_CONNECTION } from '@/drizzle/constants';
import * as schema from '@/drizzle/schema';
import { BaseAbstractRepository } from '@/repositories/base.abstract.repository';
import { RoleRepositoryInterface } from '../interface/role.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class RoleRepository
  extends BaseAbstractRepository<schema.TRole, schema.InsertRole>
  implements RoleRepositoryInterface
{
  constructor(
    @Inject(PG_CONNECTION)
    private readonly db: nodePostgres.NodePgDatabase<typeof schema>,
  ) {
    super(db, schema.roles);
  }

  /* Get all permissions from a role */
  async getPermissionsFromRole(roleId: string) {
    return await this.db.query.rolePermissions.findMany({
      where: eq(schema.rolePermissions.roleId, roleId),
      with: {
        permission: true,
      },
    });
  }
}
