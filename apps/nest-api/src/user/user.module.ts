import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/drizzle/drizzle.module';
import { UserRepository } from './repository.ts/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [DrizzleModule],
  controllers: [],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
