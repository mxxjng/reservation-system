import { Injectable } from '@nestjs/common';

import * as schema from '@/drizzle/schema';
import { UserRepository } from '../repository.ts/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOneWithRole(userId: string) {
    return await this.userRepository.findOneWithRole(userId);
  }

  async findByMail(email: string) {
    return await this.userRepository.findByMail(email);
  }

  async findById(id: string) {
    return await this.userRepository.findOneById(id);
  }

  async create(data: schema.InsertUser) {
    return await this.userRepository.create(data);
  }
}
