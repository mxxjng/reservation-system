import { Injectable } from '@nestjs/common';

import { ReservationRepository } from '../repository/reservation.repository';
import { InsertReservationSchema } from '@/drizzle/schema';

@Injectable()
export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async create(data: InsertReservationSchema) {
    return await this.reservationRepository.create(data);
  }

  async findById(id: string) {
    return await this.reservationRepository.findOneById(id);
  }

  async findAll(email: string | undefined) {
    if (email) {
      return await this.reservationRepository.findAllByMail(email);
    }

    return await this.reservationRepository.findAll();
  }

  async delete(id: string) {
    return await this.reservationRepository.delete(id);
  }

  async update(id: string, data: Partial<InsertReservationSchema>) {
    return await this.reservationRepository.update(id, data);
  }
}
