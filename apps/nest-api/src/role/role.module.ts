import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/drizzle/drizzle.module';
import { RoleRepository } from './repository/role.repository';
import { RoleService } from './service/role.service';

@Module({
  imports: [DrizzleModule],
  controllers: [],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
