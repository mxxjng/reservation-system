import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReservationService } from '../service/reservation.service';
import { ZodValidationPipe } from '@/zod/zod.pipe';
import {
  InsertReservationSchema,
  insertReservationSchema,
} from '@/drizzle/schema';

@ApiTags('Reservations')
@Controller('api/v1/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({
    summary: 'Finds all reservations',
  })
  @Get()
  findAll(@Query('email') email: string | undefined) {
    console.log(email);
    return this.reservationService.findAll(email);
  }

  @ApiOperation({
    summary: 'Creates a reservation',
  })
  @Post()
  create(
    @Body(new ZodValidationPipe(insertReservationSchema))
    data: InsertReservationSchema,
  ) {
    return this.reservationService.create(data);
  }
}
