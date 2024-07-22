import { Injectable } from '@nestjs/common';

import { InsertReservationSchema } from '@/drizzle/schema';

@Injectable()
export class PermissionService {
  constructor() {}

  async hasPermission(userId: string) {}
}
