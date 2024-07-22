import { Inject, Injectable } from '@nestjs/common';
import * as nodePostgres from 'drizzle-orm/node-postgres';

import { PG_CONNECTION } from '@/drizzle/constants';
import * as schema from '@/drizzle/schema';
import { BaseAbstractRepository } from '@/repositories/base.abstract.repository';
import { UserRepositoryInterface } from '../interface/user.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<schema.TUser, schema.InsertUser>
  implements UserRepositoryInterface
{
  constructor(
    @Inject(PG_CONNECTION)
    private readonly db: nodePostgres.NodePgDatabase<typeof schema>,
  ) {
    super(db, schema.users);
  }

  async findOneWithRole(userId: string) {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
      with: {
        role: true,
      },
    });
  }

  async findByMail(email: string) {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }
}
