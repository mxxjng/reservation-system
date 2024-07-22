import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ReservationModule } from './reservation/reservation.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ReservationModule,
    AuthModule,
    UserModule,
    RoleModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
