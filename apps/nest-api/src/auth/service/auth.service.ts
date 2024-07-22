import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { config } from 'dotenv';

import { UserService } from '@/user/service/user.service';
import { RegisterDTO } from '../types/types';

config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /* Validates user data */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByMail(email);

    const isAuthenticated = await this.comparePasswords(
      password,
      user?.password,
    );

    if (isAuthenticated && user) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  /* Gets the authenticated user */
  async getAuthenticatedUser(id: string) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('Kein Benutzer mit dieser Id gefunden.');
    }

    const { password, resetExpire, resetToken, ...rest } = user;

    return rest;
  }

  /* Signs JWT */
  async signJWT(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /* Login user */
  async login(user: any) {
    const { access_token } = await this.signJWT(user);

    const {
      password: userPassword,
      reset_password_token,
      reset_password_expire,
      ...rest
    } = user;

    return {
      user: rest,
      access_token,
    };
  }

  /* Register user */
  async register({
    email,
    password,
    firstname,
    lastname,
  }: RegisterDTO): Promise<any> {
    const user = await this.userService.findByMail(email);

    if (user) {
      throw new HttpException('This e-mail is already taken', 500);
    }

    const hashedPassword = await this.hashPassword(password);

    // TODO: add default user role
    const [createdUser] = await this.userService.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      roleId: '2ef894be-6df2-4362-a9b8-219d1ce77992',
    });

    const { access_token } = await this.signJWT(createdUser);

    const {
      password: createdUserPassword,
      resetExpire,
      resetToken,
      ...rest
    } = createdUser;

    return {
      user: rest,
      access_token,
    };
  }

  /* Hashes password */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // todo hide salt in env
    return await bcrypt.hash(password, salt);
  }

  /* Compares passwords */
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
