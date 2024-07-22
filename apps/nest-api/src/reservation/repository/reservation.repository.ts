import { Inject, Injectable } from '@nestjs/common';
import * as nodePostgres from 'drizzle-orm/node-postgres';

import { PG_CONNECTION } from '@/drizzle/constants';
import * as schema from '@/drizzle/schema';
import { BaseAbstractRepository } from '@/repositories/base.abstract.repository';
import { ReservationRepositoryInterface } from '@/reservation/interface/reservation.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReservationRepository
  extends BaseAbstractRepository<
    schema.TReservation,
    schema.InsertReservationSchema
  >
  implements ReservationRepositoryInterface
{
  constructor(
    @Inject(PG_CONNECTION)
    private readonly db: nodePostgres.NodePgDatabase<typeof schema>,
  ) {
    super(db, schema.reservations);
  }

  async findAllByMail(email: string) {
    return await this.db.query.reservations.findMany({
      where: eq(schema.reservations.email, email),
    });
  }
}
