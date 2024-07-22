import { InsertReservationSchema, TReservation } from '@/drizzle/schema';
import { BaseInterfaceRepository } from '@/repositories/repository.interface';

export interface ReservationRepositoryInterface
  extends BaseInterfaceRepository<TReservation, InsertReservationSchema> {}
