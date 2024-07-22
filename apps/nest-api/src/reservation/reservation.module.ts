import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/drizzle/drizzle.module';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { ReservationRepository } from './repository/reservation.repository';

@Module({
  imports: [DrizzleModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
