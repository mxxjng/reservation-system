import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/drizzle/drizzle.module';
import { RoleModule } from '@/role/role.module';
import { UserModule } from '@/user/user.module';
import { ReservationController } from './controller/reservation.controller';
import { ReservationRepository } from './repository/reservation.repository';
import { ReservationService } from './service/reservation.service';

@Module({
  imports: [DrizzleModule, UserModule, RoleModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
