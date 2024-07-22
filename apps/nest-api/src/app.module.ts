import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ReservationModule } from './reservation/reservation.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [
    ReservationModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
