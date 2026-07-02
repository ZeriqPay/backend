import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(data);
    return res.json(result);
  }

  @Post('register')
  async register(@Body() data: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(data);
    return res.json(result);
  }
}
