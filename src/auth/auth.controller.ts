import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtGuard)
  cekUser(@Request() req) {
    return req.user;
  }
  @Post()
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.cekUser(
      authDto.username,
      authDto.password,
    );
    return this.authService.generateToken({ id: user.id });
  }
}
