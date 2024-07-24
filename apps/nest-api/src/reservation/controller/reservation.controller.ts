import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  InsertReservationSchema,
  insertReservationSchema,
} from '@/drizzle/schema';
import { Permissions } from '@/permission/decorator/permissions.joined.decorator';
import { ZodValidationPipe } from '@/zod/zod.pipe';
import { ReservationService } from '../service/reservation.service';

@ApiTags('Reservations')
@Controller('api/v1/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({
    summary: 'Finds all reservations',
  })
  @Permissions(['read:reservation'])
  @Get()
  async findAll(@Query('email') email: string | undefined) {
    console.log(email);
    return await this.reservationService.findAll(email);
  }

  @ApiOperation({
    summary: 'Finds a single reservation',
  })
  @Permissions(['read:reservation'])
  @Get(':id')
  async findOne(@Param('id') id: string | undefined) {
    return await this.reservationService.findById(id);
  }

  @ApiOperation({
    summary: 'Creates a reservation',
  })
  @Post()
  async create(
    @Body(new ZodValidationPipe(insertReservationSchema))
    data: InsertReservationSchema,
  ) {
    return await this.reservationService.create(data);
  }

  @Permissions(['read:reservation'])
  @Get('/permissions')
  async permissionTest() {
    return 'hello from permissions';
  }

  @ApiOperation({
    summary: 'Deletes a reservation',
  })
  @Permissions(['delete:reservation'])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.reservationService.delete(id);
  }
}
