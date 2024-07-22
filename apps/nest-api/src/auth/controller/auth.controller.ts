import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ZodValidationPipe } from '@/zod/zod.pipe';
import { RegisterDTO, RegisterSchema } from '../types/types';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets the currently logged in User' })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getAuthenticatedUser(@Request() req) {
    return await this.authService.getAuthenticatedUser(req.user.sub);
  }

  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Request() req) {
    console.log(req.user);
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'registration' })
  @Post('/register')
  async registerUser(
    @Body(new ZodValidationPipe(RegisterSchema))
    data: RegisterDTO,
  ) {
    return await this.authService.register(data);
  }
}
